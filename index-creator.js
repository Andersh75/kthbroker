import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';



/* Extend the base PolymerElement class */
class IndexCreator extends PolymerElement {
  /* Define a template for the new element */
  constructor() {
    super();
    this.db = new PouchDB('http://localhost:5984/statistics');
    // this.columnObj = {};
    // this.nameObj = {};
    // this.seen = {};
    // this.totalList = [];
    // this.arrIdsName = [];
    // this.arrName = [];
    // this.arrIdsMunicipality = [];
    // this.arrMunicipality = [];

  }

  static get properties() {
    return {

      // nametabledata: {
      //   type: String,
      //   readOnly: false,
      //   notify: true,
      //   observer: '_nametabledataChanged'
      // },

    };
  }
 

  static get template() {
    return html`
     
    `;
  }




  connectedCallback() {
    super.connectedCallback()

    // this.db.createIndex({
    //   index: {
    //     fields: ['raw_real_estate_company_name', 'municipality'],
    //     name: 'nameandmunicipality',
    //     ddoc: 'mydesigndoc',
    //     type: 'json',
    //   }
    // }).then(function (result) {
    //   console.log(result);
    // }).catch(function (err) {
    //   console.log(err);
    // });


    // this.db.getIndexes().then(function (result) {
    //   console.log(result);
    // }).catch(function (err) {
    //   console.log(err);
    // });




    this.db.find({
      //selector: { raw_real_estate_company_name: { $eq: "Hemverket AB" } },
      //selector: { municipality: { $eq: "NACKA" } },
      selector: {
        $and: [
          { raw_real_estate_company_name: 'Hemverket AB' },
          { municipality: 'STOCKHOLM' }
        ]
      }
    }).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });


    // var ddoc = {
    //   _id: '_design/my_index91',
    //   views: {
    //     by_name: {
    //       map: function (doc) { emit(doc.raw_real_estate_company_name); }.toString(),
    //       reduce: '_count'
    //     }
    //   }
    // };


    // db.put(ddoc).then(function () {
    //   // success!
    // }).catch(function (err) {
    //   // some error (maybe a 409, because it already exists?)
    // });


    // this.db.createIndex({
    //   index: {
    //     fields: ['raw_real_estate_company_name', 'municipality'],
    //     name: 'muniandname',
    //     ddoc: 'my_index9',
    //     type: 'json',
    //   }
    // }).then(function (result) {
    //   console.log(result);
    // }).catch(function (err) {
    //   console.log(err);
    // });




  }
}

window.customElements.define('index-creator', IndexCreator);


















      // // that.columns = ['doc.county', 'doc.congregation'];


      // let nameArray = rows.map(row => {
      //   return row.key;
      // });


      // // console.log(nameArray);


      // nameArray.forEach(name => {
      //   let vitem = document.createElement('vaadin-item');
      //   vitem.setAttribute('on-selected', 'nameCheckboxChanged');
      //   let checkb = document.createElement('vaadin-checkbox');

      //   checkb.textContent = name;
      //   vitem.appendChild(checkb);
      //   that.$.nameBox.appendChild(vitem);
      // })



      // nameArray.forEach((name, i) => {
      //   that.nameObj[name] = {
      //     position: i,
      //     active: false
      //   }
      // });




      // console.log(that.columnObj);


      // console.log(moddedkeynames);
      // console.log(that);