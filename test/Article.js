const Article = artifacts.require("Article");

contract("Article", (accounts) => {
  let instance;
  before(async () => {
    instance = await Article.new();
  });

  it("should deployed successfully", () => {
    assert(instance, "contract was not deployed");
  });

  it("should write new article", async () => {
    const articleInstance = await Article.deployed();

    // Set value of 89

    let args = [
      "Fri Mar 26 2021 16:36:51",
      "new article",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra lectus ac pharetra placerat. Sed id mauris sed est tristique auctor. Nam pharetra diam et orci porta suscipit eu vitae sapien.",
    ];

    await articleInstance.write(...args, { from: accounts[0] });

    // Get stored value
    const article = await articleInstance.articles.call(0);
    assert.equal(article.title, "new article", "The value 89 was not stored.");
  });
});
