import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @service session;

  @tracked email = "";
  @tracked password = "";
  @tracked errorMessage = "";

  @action
  async login(email, password, event) {
    event.preventDefault();
    try {
      await this.session.authenticate("authenticator:oauth2", email, password);
      await this.session.loadUser();
      this.transitionTo("dashboard");
    } catch {
      this.errorMessage = "Invalid login.";
    }
  }
}
