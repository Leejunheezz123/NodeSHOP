var core = {};
var plugins = ["contextmenu", "dnd", "search", "state", "wholerow", "changed", "types"];

var types = {
  default: {
    max_depth: 2,
  },
};

core.themes = {
  variant: "large",
  striped: true,
};

core.check_callback = true;

core.data = {
  url: function (node) {
    return "/api/tree";
  },
  data: function (node) {
    return { id: node.id };
  },
};

function onChangedTree(e, data) {
  console.log(data.node.id);
}

function onCreateTree(e, data) {
  axios
    .post("/api/tree", { node: data.node })
    .then(function (r) {
      $("#jstreeWrap").jstree().refresh();
    })
    .catch(function (err) {
      console.log("============");
      console.log("== create ==");
      console.log(err);
      console.log("============");
    });
}

function onDeleteTree(e, data) {
  console.log(data.node.id);
}

function onUpdateTree() {
  var json = $("#jstreeWrap").jstree(true).get_json("#");
  axios
    .put("/api/tree", { json })
    .then(function (r) {
      $("#jstreeWrap").jstree().refresh();
    })
    .catch(function (err) {
      console.log("============");
      console.log("== update ==");
      console.log(err);
      console.log("============");
    });
}

$("#jstreeWrap")
  .jstree({ core: core, plugins: plugins, types })
  .on("create_node.jstree", onCreateTree)
  .on("rename_node.jstree", onRenameTree)
  .on("move_node.jstree", onUpdateTree)
  .on("delete_node.jstree", onDeleteTree);
