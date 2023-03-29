const mesureWidth = () => {
  return 524;
}

const openItem = item => {
  const hiddenContent = item.find(".colors__content");
  console.log(hiddenContent);
  const reqWidth = mesureWidth();
  console.log(reqWidth);
  hiddenContent.width(reqWidth);
}

$(".colors__button").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  console.log($this);
  const item = $this.closest(".colors__item");
  console.log(item);
  openItem(item);
});
