import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class LoginController extends Controller {
  @service session;

  @action
  async signup() {
    const user = this.model;
    await user.save();
    await this.session.authenticate(
      "authenticator:oauth2",
      user.email,
      user.password
    );
    this.transitionTo("dashboard");
  }
}
