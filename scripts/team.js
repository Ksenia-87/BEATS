const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();
  const rectanglePosition = container.find(".team__dropdown-icon");

  container.addClass("active");
  contentBlock.height(reqHeight);
  rectanglePosition.addClass("active");
}

const closeEveryItem = container => {
  const items = container.find(".team__content");
  const itemContainer = container.find(".team__item");
  const itemRectangle = container.find(".team__dropdown-icon");

  itemContainer.removeClass("active");
  itemRectangle.removeClass("active");
  items.height(0);
} 

$('.team__dropdown').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team");
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }

})
