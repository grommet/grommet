module.exports = {

  ldap_base_url: "ldap://ldap.hp.com",
  organization: "hp.com",

  scopes: {
    people: {
      label: "People",
      ou: "people",
      colorIndex: "neutral-1",
      id: "uid",
      schema: [
        {attribute: "hpPictureThumbnailURI", image: true, default: "img/no-picture.png"},
        {attribute: "cn", primary: true},
        {attribute: "hpBusinessUnit", secondary: true},
        {attribute: "uid", uid: true}
      ],
      filterForSearch: function (searchText) {
        // handle "Last, First" syntax
        if (searchText.indexOf(",") !== -1) {
          searchText = searchText.replace(/(.+),\s*(.+)/, "$2 $1");
        }
        // only return Active employees
        return "(&(hpStatus=Active)(|(cn=*" + searchText + "*)(uid=*" + searchText + "*)))";
      }
    },

    groups: {
      label: "Groups",
      ou: "groups",
      colorIndex: "neutral-2",
      id: "cn",
      schema: [
        {attribute: "cn", primary: true, uid: true},
        {attribute: "description", secondary: true}
      ],
      filterForSearch: function (searchText) {
        return "(cn=*" + searchText + "*)";
      }
    },

    locations: {
      label: "Locations",
      ou: "locations",
      colorIndex: "neutral-3",
      id: "hpRealEstateID",
      schema: [
        {attribute: "buildingName", primary: true},
        {attribute: "l", secondary: true},
        {attribute: "hpRealEstateID", uid: true}
      ],
      filterForSearch: function (searchText) {
        searchText = searchText.replace(/\s+/g, "*");
        return "(|(buildingName=*" + searchText + "*)(l=*" + searchText + "*))";
      }
    }
  },

  attributesFromSchema: function (schema) {
    return schema.map(function (item) {
      return item.attribute;
    });
  }
};

