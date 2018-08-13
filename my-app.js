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

  }

  static get properties() {
    return {
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
 

  static get template() {
    return html`

    <style>
      :host {
        /* display: inline-block; */
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



      
      


      <vaadin-grid id="namegrid" aria-label="Basic Binding Example" items="{{nametabledata}}" on-change="handleNameGridChange" >
        <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>
        <vaadin-grid-column>
          <template class="header"><vaadin-grid-sorter path="key">Name</vaadin-grid-sorter></template>
          <template>[[item.key]]</template>
          <template class="footer">Name</template>
        </vaadin-grid-column>
      </vaadin-grid>


      <vaadin-grid id="municipalitygrid" aria-label="Basic Binding Example" items="{{municipalitytabledata}}" on-change="handleMunicipalityGridChange" >
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

          console.log('subArr');
          console.log(subArr);
          console.log(subArr.length);

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

          console.log('this.totalList');
          console.log(this.totalList);

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

          console.log('listToRemove');
          console.log(listToRemove);
          console.log(listToRemove.length);

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

          console.log('this.totalList');
          console.log(this.totalList);
        }

        that.arrName = newArrName;


        that.arrIdsName = newArrIdsName;

        // that.totalList = that.totalList.concat(...uniqueitems);
        // console.log('totalList');
        // console.log(that.totalList);
      that.tabledata = this.totalList;
      });

  }



  handleMunicipalityGridChange(e) {
    console.log('MUNICIPALITYGRIDCHANGE');
    console.log(e);
    console.log(this.$.municipalitygrid.selectedItems);
    let selectedMunicipalities = this.$.municipalitygrid.selectedItems
    let municipalities = selectedMunicipalities.map(municipality => {
      return municipality.key;
    });

    console.log(municipalities);
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

      console.log('arrdiff');
      console.log(arrdiff.length);

      console.log(newArrIdsName.length);
      console.log(that.arrIdsMunicipality.length);

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

        console.log('subArr');
        console.log(subArr);
        console.log(subArr.length);

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

        console.log('this.totalList');
        console.log(this.totalList);

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

        console.log('listToRemove');
        console.log(listToRemove);
        console.log(listToRemove.length);

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

        console.log('this.totalList');
        console.log(this.totalList);
      }

      that.arrMunicipality = newArrName;


      that.arrIdsMunicipality = newArrIdsName;

      // that.totalList = that.totalList.concat(...uniqueitems);
      // console.log('totalList');
      // console.log(that.totalList);
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


    //CREATE LIST OF NAMES
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


  }
}
/* Register the new element with the browser */
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