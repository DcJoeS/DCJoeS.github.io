﻿/*global define,dojo,alert,require */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
/*
 | Copyright 2014 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "widgets/appHeader/appHeader",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/promise/all",
    "dojo/topic",
    "dojo/i18n!nls/localizedStrings",
    "dojo/query",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/string",
    "dojo/text!themes/theme-template.css",
    "dojo/text!themes/mediaQueries-template.css",
    "esri/urlUtils",
    "esri/arcgis/utils",
    "widgets/searchAGOLGroupItems/searchAGOLGroupItems"
], function (declare, _WidgetBase, AppHeader, array, lang, Deferred, all, topic, nls, query, domClass, domConstruct, string, ThemeCss, MediaThemeCss, urlUtils, arcgisUtils, PortalSignin) {

    return declare([_WidgetBase], {
        nls: nls,

        /**
        * load widgets specified in Header Widget Settings of configuration file
        *
        * @class
        * @name coreLibrary/widgetLoader
        */
        startup: function () {
            /**
            * create an object with widgets specified in Header Widget Settings of configuration file
            * @param {array} dojo.appConfigData.AppHeaderWidgets Widgets specified in configuration file
            */
            this._applicationThemeLoader();
            this.loadWidgets();
        },

        loadWidgets: function () {
            var widgets = {},
                deferredArray = [];
            array.forEach(dojo.appConfigData.AppHeaderWidgets, function (widgetConfig) {
                var deferred = new Deferred();
                widgets[widgetConfig.WidgetPath] = null;
                require([widgetConfig.WidgetPath], function (Widget) {

                    widgets[widgetConfig.WidgetPath] = new Widget();

                    deferred.resolve(widgetConfig.WidgetPath);
                });
                deferredArray.push(deferred.promise);
            });
            all(deferredArray).then(lang.hitch(this, function () {
                try {
                    /**
                    * create application header
                    */
                    var portalSigninWidgetLoader;
                    // set app ID settings and call init after
                    portalSigninWidgetLoader = new PortalSignin();
                    portalSigninWidgetLoader.fetchAppIdSettings().then(lang.hitch(this, function (response) {
                        this._createApplicationHeader(widgets);
                        portalSigninWidgetLoader.initializePortal().then(lang.hitch(this, function () {
                            this._applicationThemeLoader();
                            if (dojo.configData.values.appid && response.token) {
                                topic.publish("onSignIn", null, true);
                            }
                        }));
                    }));
                } catch (ex) {
                    alert(nls.errorMessages.widgetNotLoaded);
                }
            }));
        },

        /**
        * create application header
        * @param {object} widgets Contain widgets to be displayed in header panel
        * @memberOf coreLibrary/widgetLoader
        */
        _createApplicationHeader: function (widgets) {
            var applicationHeader = new AppHeader();
            applicationHeader.loadHeaderWidgets(widgets);
        },

        setFalseValues: function (obj) {
            var key;

            // for each key
            for (key in obj) {
                // if not a prototype
                if (obj.hasOwnProperty(key)) {
                    // if is a false value string
                    if (typeof obj[key] === 'string' && (obj[key].toLowerCase() === 'false' || obj[key].toLowerCase() === 'null' || obj[key].toLowerCase() === 'undefined')) {
                        // set to false bool type
                        obj[key] = false;
                    }
                }
            }
            // return object
            return obj;
        },

        _applicationThemeLoader: function () {
            var cssString, mediaCssString, headNode, styleNode, mediaStyleNode;
            //if theme is configured
            if (dojo.configData.values.theme) {
                this._setConfiguredColor();
                //substitute theme color values in theme template
                cssString = string.substitute(ThemeCss, {
                    SelectedThemeColor: dojo.configData.values.theme
                });
                mediaCssString = string.substitute(MediaThemeCss, {
                    SelectedThemeColor: dojo.configData.values.theme
                });
                //Create Style using theme template and append it to head
                headNode = document.getElementsByTagName('head')[0];
                styleNode = document.getElementById("styleNode");
                mediaStyleNode = document.getElementById("mediaStyleNode");
                if (styleNode) {
                    headNode.removeChild(styleNode);
                    styleNode = null;

                }
                if (mediaStyleNode) {
                    headNode.removeChild(mediaStyleNode);
                    mediaStyleNode = null;
                }
                if (dojo.isIE < 10) {
                    styleNode = document.createElement('style');
                    styleNode.id = "styleNode";
                    styleNode.type = 'text/css';
                    styleNode.styleSheet.cssText = cssString;
                    headNode.appendChild(styleNode);
                    mediaStyleNode = document.createElement('style');
                    mediaStyleNode.id = "mediaStyleNode";
                    mediaStyleNode.type = 'text/css';
                    mediaStyleNode.styleSheet.cssText = mediaCssString;
                    headNode.appendChild(mediaStyleNode);
                } else {
                    domConstruct.create("style", {
                        "type": "text/css",
                        "innerHTML": cssString,
                        "id": "styleNode"
                    }, headNode);
                    domConstruct.create("style", {
                        "type": "text/css",
                        "innerHTML": mediaCssString,
                        "id": "mediaStyleNode"
                    }, headNode);
                }
            }
        },

        /**
        * set color value for configured theme
        * @memberOf coreLibrary/widgetLoader
        */
        _setConfiguredColor: function () {
            //if theme is not configured from the color palette then set the color value for the respective themes to support backward compatibility
            if (dojo.configData.values.theme === "blueTheme") {
                dojo.configData.values.theme = "#007ac2";
            } else if (dojo.configData.values.theme === "redTheme") {
                dojo.configData.values.theme = "#800000";
            } else if (dojo.configData.values.theme === "greenTheme") {
                dojo.configData.values.theme = "#028d6a";
            }
        }

    });
});
