const Greetings = artifacts.require("Greetings");

contract("Greetings", (accounts) => {
  let instance, greetingsInstance;
  before(async () => {
    instance = await Greetings.new("Welcome to the Truffle box: react & redux");
    greetingsInstance = await Greetings.deployed(
      "Welcome to the Truffle box: react & redux"
    );
  });

  it("should deployed successfully", () => {
    assert(instance, "contract was not deployed");
  });

  it("should write welcome message upon deploy", async () => {
    const message = await greetingsInstance.read.call();
    assert.equal(message, "Welcome to the Truffle box: react & redux");
  });

  it("should write a greetings message", async () => {
    const message = "Welcome to Dapp Example with react & redux";

    // write greetings message
    await greetingsInstance.write(message, {
      from: accounts[0],
    });

    // read greetings message
    const greetingMessage = await greetingsInstance.read.call();
    assert.equal(greetingMessage, message);
  });
});
