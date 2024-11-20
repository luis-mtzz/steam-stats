"use strict";

var httpClient = function () {
    const fetch = require("node-fetch");
    const exception = require("./sv.logExceptions");
    const config = require("./../../../config.json");
    var reportErrors = true;
    var httpStatusOk;
    var httpStatusCode;
    var httpStatusText;

    this.POST = "POST";
    this.GET = "GET";
    this.PUT = "PUT";
    this.POST = "POST";

    this.BEARER = "BEARER";
    this.BASIC = "BASIC";
    this.TOKEN = "TOKEN";
    this.NONE = "NONE";

    this.httpsAgent = null;

    this.Accept = "application/json";
    this.ContentType = "application/json";

    this.useCustomAgent = function (agent) {
        this.httpsAgent = agent;
    };

    this.getHeaders = function (token = this.defaultToken) {
        let AuthHeader = {};
        switch (this.Authentication) {
            case this.BEARER:
                AuthHeader = {
                    Authorization: token ? "Bearer " + token : null,
                };
                break;
            case this.BASIC:
                let basicAuth = Buffer.from(
                    this.ClientID + ":" + token,
                ).toString("base64");
                AuthHeader = { Authorization: "Basic" + basicAuth };
                break;
            case this.TOKEN:
                AuthHeader = { Authorization: token };
                break;
            case this.NONE:
                break;
        }
        return AuthHeader;
    };

    this.submitRequest = async (url, httpMethod, payload, optionalReq) => {
        let contentType;
        let remoteResponse = null;
        let localResponse = { ok: true, data: null, error: null };
        let customHeaders = this.getHeaders();
        let options = {
            method: httpMethod,
            body: payload ? JSON.stringify(payload) : null,
            headers: customHeaders,
            agent: this.httpsAgent,
        };

        try {
            remoteResponse = await fetch(url, options);
            if (remoteResponse.ok) {
                contentType = remoteResponse.headers.get("content-type");
                if (
                    contentType &&
                    contentType.indexOf("application/json") != -1
                ) {
                    localResponse.data = await remoteResponse.json();
                } else {
                    localResponse.data = await remoteResponse.text();
                }
            } else {
                let error = new Error(remoteResponse.statusText);
                error.status = remoteResponse.status;
                error.statusText = remoteResponse.statusText;
                throw error;
            }
        } catch (error) {
            localResponse.ok = false;
            localResponse.error = error;
            if (reportErrors) {
                let custom = new Object();
                custom.httpUrl = url;
                custom.httpMethod = httpMethod;
                custom.httpPayload = httpStatusText;
                exception.log(error, optionalReq, custom);
            }
        }
        return localResponse;
    };
};

module.exports = new httpClient();
