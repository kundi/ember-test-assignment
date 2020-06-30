import AddonSessionService from "ember-simple-auth/services/session";
import { inject as service } from "@ember/service";
import { tracked } from '@glimmer/tracking';

export default class SessionService extends AddonSessionService {
  @service store;

  @tracked user;

  async loadUser() {
    if (!this.isAuthenticated) return;
    if (this.user) return;
    const user = await this.store.queryRecord('user', { me: true });
    this.user = user;
    return user;
  }

  invalidate() {
    super.invalidate(...arguments);
    this.user = null;
  }
}
