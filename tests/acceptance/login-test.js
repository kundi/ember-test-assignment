import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import defaultScenario from "ember-test-assignment/mirage/scenarios/default";
import loginPage from "../helpers/page-objects/login";

module("Acceptance | login", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Logging in with invalid credentials", async function(assert) {
    defaultScenario(this.server)
    await loginPage.visit();
    await loginPage.fillInEmail("unregistered@user.com");
    await loginPage.fillInPassword("anything");
    await loginPage.submit();
    assert.equal(currentURL(), loginPage.url);
    assert.dom(loginPage.selectors.error).containsText("Invalid login.");
  });

  test("Logging in with valid credentials", async function(assert) {
    defaultScenario(this.server)
    await loginPage.visit();
    await loginPage.fillInEmail("test@test.com");
    await loginPage.fillInPassword("test");
    await loginPage.submit();
    assert.equal(currentURL(), "/");
  });
});
