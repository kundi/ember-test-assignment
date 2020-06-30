import { alias } from "@ember/object/computed";
import Service, { inject as service } from "@ember/service";
import RSVP from "rsvp";

export default Service.extend({
  session: service("session"),
  store: service(),
  account: alias("user.account"),
  isAuthenticated: alias("session.isAuthenticated"),
  load() {
    if (this.isAuthenticated) {
      return this.store
        .queryRecord("user", { me: true })
        .then(user => {
          this.set("user", user);
          this.session.set("data.accountId", user.get("account.id"));
        })
        .catch(() => {
          this.session
            .invalidate()
            .then(() => {
              window.location = "/";
            });
        });
    } else {
      return RSVP.resolve(null);
    }
  },
  nullify() {
    this.set("user", null);
  }
});
