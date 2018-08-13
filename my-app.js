import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/custom-style';
import '@polymer/iron-media-query';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-dropdown-menu';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-overlay';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-context-menu';


/* Extend the base PolymerElement class */
class MyApp extends PolymerElement {
  /* Define a template for the new element */
  constructor() {
    super();
    this.db = new PouchDB('http://localhost:5984/statistics');
    this.columnObj = {};
    this.nameObj = {};
    this.seen = {};
    this.totalList = [];
    this.arrIdsName = [];
    this.arrName = [];
    this.arrIdsMunicipality = [];
    this.arrMunicipality = [];
    this.page = 0;

  }

  static get properties() {
    return {
      items: {
        type: Array,
        readOnly: false,
        notify: true,
      },
      page: {
        type: Number,
        readOnly: false,
        notify: true,
      },
      pages: {
        type: Array,
        readOnly: false,
        notify: true,
      },
      dataprop: {
        type: String,
        readOnly: false,
        notify: true,
        observer: '_datapropChanged'
      },
      tabledata: {
        type: String,
        readOnly: false,
        notify: true,
        observer: '_tabledataChanged'
      },
      nametabledata: {
        type: String,
        readOnly: false,
        notify: true,
        observer: '_nametabledataChanged'
      },
      municipalitytabledata: {
        type: String,
        readOnly: false,
        notify: true,
        observer: '_municipalitytabledataChanged'
      },
      columnObj: {
        type: Object,
        readOnly: false,
        notify: true,
        observer: '_columnObjChanged'
      },
      nameObj: {
        type: Object,
        readOnly: false,
        notify: true,
        observer: '_nameObjChanged'
      },
      hidden: {
        type: Boolean,
        readOnly: false,
        notify: true,
        value: false
      },
      columns: {
        type: Array
      },
    };
  }
 
  static get observers() {
    return [
      '_itemsChanged(items, page)'
    ]
  }

  static get template() {
    return html`

    <style>
      :host {
        /* display: inline-block; */
      }

      #pages {
        display: flex;
        flex-wrap: wrap;
        margin: 20px;
      }

      #pages > button {
        user-select: none;
        padding: 5px;
        margin: 0 5px;
        border-radius: 10%;
        border: 0;
        background: transparent;
        font: inherit;
        outline: none;
        cursor: pointer;
      }

      #pages > button:hover,
      #pages > button:focus {
        color: #ccc;
        background-color: #eee;
      }

      #pages > button[selected] {
        font-weight: bold;
        color: white;
        background-color: #ccc;
      }
    </style>




      <!-- <vaadin-button>BUTTON</vaadin-button>
      <vaadin-dropdown-menu placeholder="Language"></vaadin-dropdown-menu>
      
      <vaadin-dropdown-menu>
        <template>
          <vaadin-list-box id="menu">
          </vaadin-list-box>
        </template>
      </vaadin-dropdown-menu> -->



      







    <vaadin-grid id="gridpaginated" page-size="100" height-by-rows>

      <vaadin-grid-column>
        <template class="header">Municipality</template>
        <template>
          [[item.municipality]]
        </template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Build year</template>
        <template>
          [[item.build_year]]
        </template>
      </vaadin-grid-column>

      <vaadin-grid-column width="200px">
        <template class="header">Name</template>
        <template>
          <div>[[item.raw_real_estate_company_name]]</div>
        </template>
      </vaadin-grid-column>

    </vaadin-grid>


    <div id="pages">
      <button on-click="_prev">&lt;</button>
      <template is="dom-repeat" items="[[pages]]">
        <button on-click="_select" selected$="[[_isSelected(page, item)]]">[[item]]</button>
      </template>
      <button on-click="_next">&gt;</button>
    </div>








      


      <vaadin-grid id="namegrid" aria-label="Basic Binding Example" items="{{nametabledata}}" on-change="handleNameGridChangeFind" >
        <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>
        <vaadin-grid-column>
          <template class="header"><vaadin-grid-sorter path="key">Name</vaadin-grid-sorter></template>
          <template>[[item.key]]</template>
          <template class="footer">Name</template>
        </vaadin-grid-column>
      </vaadin-grid>


      <vaadin-grid id="municipalitygrid" aria-label="Basic Binding Example" items="{{municipalitytabledata}}" on-change="handleMunicipalityGridChangeFind" >
        <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>
        <vaadin-grid-column>
          <template class="header"><vaadin-grid-sorter path="key">Municipality</vaadin-grid-sorter></template>
          <template>[[item.key]]</template>
          <template class="footer">Municipality</template>
        </vaadin-grid-column>
      </vaadin-grid>






<!-- <vaadin-combo-box on-change="handleChange" id="changeEventDemo" items="{{dataprop}}" item-value-path="key" item-label-path="key">
        <template>
          [[item.key]]
        </template>
      </vaadin-combo-box> -->



<vaadin-list-box id="columnBox" on-change="columnCheckboxChanged"></vaadin-list-box>


<vaadin-list-box id="nameBox" on-change="nameCheckboxChanged"></vaadin-list-box>








    <vaadin-grid aria-label="Dynamic Columns Example" id="gridtwo" items="{{tabledata}}" size="200">
      <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>
      <template is="dom-repeat" items="[[columns]]" as="column">
        
        <vaadin-grid-column>
          <template class="header">[[column]]</template>
          <template>[[get(column, item)]]</template>
        </vaadin-grid-column>
      </template>
    </vaadin-grid>
       
          
    `;
  }

  // handleChange(e) {
  //   let that = this;
  //   console.log('CHANGED');
  //   console.log(e.path[0].__data.value);
  //   this.db.query('my_index6/by_name', {
  //     key: e.path[0].__data.value,
  //     include_docs: true
  //   }).then(function (res) {
  //     console.log(res);

  //     that.tabledata = res.rows



  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // }



  // congregationChange(e) {
  //   console.log('CONGREGATIONCHANGE');
  //   console.log(e);
  //   this.columns = ['doc.county', 'doc.county'];
  //   this.hidden = !this.hidden;
  // }


  _isSelected(page, item) {
    return page === item - 1;
  };

_select(e) {
  this.page = e.model.item - 1;
};

_next() {
  this.page = Math.min(this.pages.length - 1, this.page + 1);
};

_prev() {
  this.page = Math.max(0, this.page - 1);
};

_itemsChanged(items, page) {
  if (items === undefined || page === undefined) {
    return;
  }

  if (!this.pages) {
    this.pages = Array.apply(null, { length: Math.ceil(items.length / this.$.gridpaginated.pageSize) }).map(function (item, index) {
      return index + 1;
    });
  }

  var start = page * this.$.gridpaginated.pageSize;
  var end = (page + 1) * this.$.gridpaginated.pageSize;
  this.$.gridpaginated.items = items.slice(start, end);
};






  handleNameGridChangeFind(e) {
    let selectedNames = this.$.namegrid.selectedItems
    let names = selectedNames.map(name => {
      return name.key;
    });
    let that = this;
    this.db.find({
    selector: { raw_real_estate_company_name: { $gte: "a" } },
      //selector: { municipality: { $eq: "NACKA" } },
      // selector: {
      //   municipality: {$or: [
      //     { $eq: 'STOCKHOLM' },
      //     { $eq: 'NACKA' }
      //   ]}
      // },
      // selector: { 
      //   raw_real_estate_company_name: { $gte: "a" },
      //   municipality: { $gte: null },
      //   build_year: { $gte: "1955" }
      // },
      limit: 1000
    }).then(function (result) {
      console.log(result);
      console.log(result.docs);
      that.items = result.docs;
    }).catch(function (err) {
      console.log(err);
    });
  }

  


  handleGridChange(e) {
    // console.log('GRIDCHANGE');
    // console.log(e);
    // console.log(this.$.grid.selectedItems);
  }

  handleNameGridChange(e) {
    console.log('GRIDCHANGE');
    console.log(e);
    console.log(this.$.namegrid.selectedItems);
    let selectedNames = this.$.namegrid.selectedItems
    let names = selectedNames.map(name => {
      return name.key;
    });

    let that = this;

    Promise.all(names.map(col => {
      return this.db.query('my_index6/by_name', {
        key: col,
        include_docs: true
      });
    })).then((res) => {
        let newArrName = [];
        res.forEach(arr => {
          newArrName.push(...arr.rows);
        });

        let newArrIdsName = newArrName.map(item => {
          return item.id;
        });

        let arrdiff = this.arr_diff(newArrIdsName, that.arrIdsName);

        console.log('arrdiff');
        console.log(arrdiff.length);

        console.log(newArrIdsName.length);
        console.log(that.arrIdsName.length);

        if (newArrIdsName.length > that.arrIdsName.length) {

          var subArr = newArrName.filter(newArrNameItem => {
            let test = true;
            that.arrName.forEach(arrNameItem => {
              if (arrNameItem.id === newArrNameItem.id) {
                test = false;
              }
            });
            return test;
          });

          //SUBARR SKA TESTAS MOT LISTAN OCH LÄGGAS TILL OM ID INTE REDAN FINNS

          let addThese = subArr.filter(subArrItem => {
            let test = true;
            this.totalList.forEach(totalListItem => {
              if (subArrItem.id === totalListItem.id) {
                test = false;
              }
            });
            return test;
          });

          this.totalList.push(...addThese);

        } else {

          let listToRemove = that.arrName.filter(arrNameItem => {
            let test = true;
            newArrName.forEach(newArrNameItem => {
              if (newArrNameItem.id === arrNameItem.id) {
                test = false;
              }
            });
            return test;
          });

          //SUBARR SKA TESTAS MOT LISTAN OCH TAS BORT OM ID INTE REDAN FINNS
          let listAfterRemoval = this.totalList.filter(totalListItem => {
            let test = true;
            listToRemove.forEach(listToRemoveItem => {
              if (listToRemoveItem.id === totalListItem.id) {
                test = false;
              }
            });
            return test;
          });

          this.totalList = listAfterRemoval;

        }

        that.arrName = newArrName;


        that.arrIdsName = newArrIdsName;

      that.tabledata = this.totalList;
      });

  }

  handleMunicipalityGridChange(e) {
    let selectedMunicipalities = this.$.municipalitygrid.selectedItems
    let municipalities = selectedMunicipalities.map(municipality => {
      return municipality.key;
    });

    let that = this;

    Promise.all(municipalities.map(col => {
      return this.db.query('my_index6/by_municipality', {
        key: col,
        include_docs: true
      });
    })).then((res) => {
      let newArrName = [];
      res.forEach(arr => {
        newArrName.push(...arr.rows);
      });

      let newArrIdsName = newArrName.map(item => {
          return item.id;
      });

      let arrdiff = this.arr_diff(newArrIdsName, that.arrIdsMunicipality);

      if (newArrIdsName.length > that.arrIdsMunicipality.length) {
        
        var subArr = newArrName.filter(newArrNameItem => {
          let test = true;
          that.arrMunicipality.forEach(arrNameItem => {
            if (arrNameItem.id === newArrNameItem.id) {
              test = false;
            }
          });
          return test;
        });

        //SUBARR SKA TESTAS MOT LISTAN OCH LÄGGAS TILL OM ID INTE REDAN FINNS

        let addThese = subArr.filter(subArrItem => {
          let test = true;
          this.totalList.forEach(totalListItem => {
            if (subArrItem.id === totalListItem.id) {
              test = false;
            }
          });
          return test;
        });

        this.totalList.push(...addThese);

      } else {

        let listToRemove = that.arrMunicipality.filter(arrNameItem => {
          let test = true;
          newArrName.forEach(newArrNameItem => {
            if (newArrNameItem.id === arrNameItem.id) {
              test = false;
            }
          });
          return test;
        });

        //SUBARR SKA TESTAS MOT LISTAN OCH TAS BORT OM ID INTE REDAN FINNS
        let listAfterRemoval = this.totalList.filter(totalListItem => {
          let test = true;
          listToRemove.forEach(listToRemoveItem => {
            if (listToRemoveItem.id === totalListItem.id) {
              test = false;
            }
          });
          return test;
        });

        this.totalList = listAfterRemoval;

      }

      that.arrMunicipality = newArrName;

      that.arrIdsMunicipality = newArrIdsName;

      that.tabledata = this.totalList;
    });
  }

  arr_diff(a1, a2) {

  var a = [], diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
}



  columnCheckboxChanged(e) {
    this.columnObj[e.path[0].textContent].active = e.path[0].__data.checked;

    let selectedColumns = Object.keys(this.columnObj);

    let filteredColumns = selectedColumns.filter(column => {
      return this.columnObj[column].active;
    })

    let mappedFilterdColumns = filteredColumns.map(column => {
      return 'doc.' + column;
    });

    this.columns = mappedFilterdColumns;
  }




  nameCheckboxChanged(e) {
    let that = this;

    this.nameObj[e.path[0].textContent].active = e.path[0].__data.checked;

    let selectedColumns = Object.keys(this.nameObj);

    let filteredColumns = selectedColumns.filter(column => {
      return this.nameObj[column].active;
    });

    Promise.all(filteredColumns.map(col => {
      return this.db.query('my_index6/by_name', {
        key: col,
        include_docs: true
      });
    })).then((res) => {
      let emptArr = [];
      res.forEach(arr => {
        emptArr.push(...arr.rows);
      });
      that.tabledata = emptArr;
    });



  }

  _datapropChanged() {
    console.log('READY'); 
  }

  _tabledataChanged() {
    console.log('READY');
  }

  _columnObjChanged() {
    console.log('_columnObjChanged');
  }


  connectedCallback() {
    super.connectedCallback()

    let that = this;

    //CREATE LIST OF COLUMNS
    this.db.query('my_index6/by_name', {
      include_docs: true,
      limit: 1
    }).then(function (res) {

      let rows = res.rows;
      let keys = rows[0].doc;
      let keynames = Object.keys(keys);
      let moddedkeynames = keynames.slice(4)

      moddedkeynames.forEach(name => {
        let vitem = document.createElement('vaadin-item');
        vitem.setAttribute('on-selected', 'columnCheckboxChanged');
        let checkb = document.createElement('vaadin-checkbox');
        
        checkb.textContent = name;
        vitem.appendChild(checkb);
        that.$.columnBox.appendChild(vitem);
      })

      moddedkeynames.forEach((name, i) => {
        that.columnObj[name] = {
          position: i,
          active: false
        }
      });
    }).catch(function (err) {
      console.log(err);
    });


    //CREATE TABLE OF NAMES
    this.db.query('my_index8/by_name', {
      startkey: 'A',
      reduce: true,
      group: true,
    }).then(function (res) {

      let rows = res.rows;

      that.nametabledata = rows;
    }).catch(function (err) {
      console.log(err);
    });


    //CREATE TABLE OF MUNICIPALITIES
    this.db.query('my_index8/by_municipality', {
      startkey: 'A',
      reduce: true,
      group: true,
    }).then(function (res) {

      let rows = res.rows;

      that.municipalitytabledata = rows;
    }).catch(function (err) {
      console.log(err);
    });



    this.db.find({
      selector: { name: { $eq: 'Mario' } }
    }).then(function (result) {
      // handle result
    }).catch(function (err) {
      console.log(err);
    });

  }
}

window.customElements.define('my-app', MyApp);


















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