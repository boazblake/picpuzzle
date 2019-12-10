// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "app.js": /^app/
    }
  },
  stylesheets: { joinTo: { "app.css": "./app/styles/*.css" } }
}

exports.plugins = {
  babel: { presets: ["latest", "stage-0"] }
}

exports.paths = {
  public: "docs"
}


exports.npm = {
  globals:{m: 'mithril'}
}