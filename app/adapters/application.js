import JSONAPIAdapter from "@ember-data/adapter/json-api";
import { underscore } from "@ember/string";
import { pluralize } from "ember-inflector";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "../config/environment";

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  namespace = ENV.apiNamespace;
  host = ENV.serverURL;

  pathForType(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  }

  @computed("session.{isAuthenticated,data.authenticated.access_token}")
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers[
        "Authorization"
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }
    return headers;
  }
}
