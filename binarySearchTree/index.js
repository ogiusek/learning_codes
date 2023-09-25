console.log("works");

function addHTMLElement(parrentId, className = "", idName = "", value = "") {
  const child = document.createElement("div");
  child.setAttribute("class", className);
  child.setAttribute("id", idName);
  child.innerHTML = value;

  document.getElementById(parrentId).appendChild(child);
}

const getRotation = (xDist, yDist) => Math.atan2(yDist, xDist) * (180 / Math.PI);

class Node {
  left = null;
  right = null;
  value = null;

  constructor(value) {
    this.value = value;
    this.id = `${new Date().getTime()}_${value}_${Math.random()}`;
  };
  refresh() {
    const it = document.getElementById(this.id).querySelector(".value").getBoundingClientRect();
    if (this.left) {
      const element = document.getElementById(this.left.id).querySelector(".value");
      const elementRect = element.getBoundingClientRect();
      const xDist = (it.x + it.width / 2) - (elementRect.x + elementRect.width / 2);
      const yDist = (it.y + it.height) - (elementRect.y);

      element.setAttribute("style", `--rotation: ${-90 + getRotation(-xDist, -yDist)}deg; --height: ${Math.sqrt(xDist * xDist + yDist * yDist)}px;`);
    }

    if (this.right) {
      const element = document.getElementById(this.right.id).querySelector(".value");
      const elementRect = element.getBoundingClientRect();
      const xDist = (it.x + it.width / 2) - (elementRect.x + elementRect.width / 2);
      const yDist = (it.y + it.height) - (elementRect.y);

      element.setAttribute("style", `--rotation: ${-90 + getRotation(-xDist, -yDist)}deg; --height: ${Math.sqrt(xDist * xDist + yDist * yDist)}px;`);
    }

    this.left?.refresh();
    this.right?.refresh();
  }

  addChild(value) {
    if (value < this.value) { // add left child
      if (this.left === null) {
        this.left = new Node(value);
        addHTMLElement(this.id, "left", this.left.id);
        addHTMLElement(this.left.id, "value", "", this.left.value);
      } else
        this.left.addChild(value);
    } else { // add right child
      if (this.right === null) {
        this.right = new Node(value);
        addHTMLElement(this.id, "right", this.right.id);
        addHTMLElement(this.right.id, "value", "", this.right.value);
      } else
        this.right.addChild(value);
    }
    this.refresh();
  }
};



let bts = null;

function addNode(val) {
  if (bts) {
    bts.addChild(val);
  } else {
    bts = new Node(val);
    addHTMLElement("bst", "", bts.id);
    addHTMLElement(bts.id, "value", "", bts.value);
  }
}

function addChild(e) {
  e.preventDefault();
  const input = document.getElementById("input");
  const new_node_value = Number(input.value);
  input.value = "";
  addNode(new_node_value);
}