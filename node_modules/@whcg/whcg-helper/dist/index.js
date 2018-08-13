'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var whcgMy = require('@whcg/whcg-my');

var h = {};


(function () {


    this.filters = {
        
        makeFunction: whcgMy.my.curry(function(func) {
            return function(a) {
                return a.filter(func);
            };
        }),

        odd: whcgMy.my.curry(function(a) {
            return h.filters.makeFunction(h.boolean.isOddInteger)(a);
        }),

        even: whcgMy.my.curry(function(a) {
            return h.filters.makeFunction(h.boolean.isEvenInteger)(a);
        }),

        unique: whcgMy.my.curry(function(a) {
            return h.filters.makeFunction(h.boolean.isUnique)(a);
        }),

        oddAndUnique: whcgMy.my.curry(function(a) {
            return h.compose(h.filters.odd, h.filters.unique)(a);
        })
    };

    

    //Unit tests
    this.unitTester = whcgMy.my.curry(function (subject, args, predicate, descriptor) {
        let exception = undefined;
        let value = undefined;

        try {
                value = subject.apply(null, args);
        } catch(err) {
            exception = err;
        }

        let result = false;
        try {
            result = predicate(value, exception);
        } catch(err) {
            throw err;
        }

        (result ? console.warn : console.warn)((result ? 'PASSED' : 'FAILED') + ': ' + descriptor + (exception ? ' -- EXCEPTION: ' + exception : ''));
        return result;
    });
    

    // Map, Reduce, Filter...
    //DONE!
    this.filter = whcgMy.my.curry(function(callback, array) {
        let passed = [];
        for(let element of array) {
            if (callback(element)) {
                passed.push(element);
            }
        }
        return passed;
    });

    //DONE
    this.map = whcgMy.my.curry(function (callback, array) {
        var newArray = [];
        for (var i = 0; i < array.length; i = i + 1) {
            newArray[i] = callback(array[i], i);
        }
        return newArray; 
    });

    //DONE
    this.reduce = whcgMy.my.curry(function (callback, initialValue, array) {
        var working = initialValue;
        for (var i = 0; i < array.length; i = i + 1) {
            working = callback(working, array[i]);
        }
        return working;
    });

    this.compose = whcgMy.my.curry(function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);
            i = i - 1;
            while (i >= 0) {
                result = args[i].call(this, result);
                i = i - 1;
            }
            return result;
        };
    });


    //Booleans
    this.boolean = {

        //TODO: REPLACE FUNCTION WITH OTHERS BELOW
        //Null, undefined, empty array, empty object, empty string = empty
        isEmpty: whcgMy.my.curry(function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            if (typeof (obj) === 'boolean') {
                return false;
            }
            return true;
        }),
        
        //DONE!
        //Expects array
        isEmptyArray: whcgMy.my.curry(function (obj) {
            if(!h.boolean.isArray(obj)) {
                throw 'Parameter is not an array';   
            }
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            
            return true;
        }),

        //DONE!
        //Expects object
        isEmptyObject: whcgMy.my.curry(function (obj) {
            if(!h.boolean.isObject(obj)) {
                throw 'Parameter is not an object';   
            }
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            
            return true;
        }),
        
        //DONE!
        //Expects string
        isEmptyString: whcgMy.my.curry(function (obj) {
            if(!h.boolean.isString(obj)) {
                throw 'Parameter is not a string';   
            }
            if (obj === '') {
                return true;
            } else {
                return false;
            } 
        }),

        //DONE!
        //Expects anything
        isDefined: whcgMy.my.curry(function (item) {
            return (typeof item !== 'undefined');
        }),

        //DONE!
        //Expects anything
        isNull: whcgMy.my.curry(function (item) {
            return (item === null);
        }),

        //DONE!
        //Expects anything
        isNullOrUndefined: whcgMy.my.curry(function (item) {
            return h.boolean.isNull(item) || !h.boolean.isDefined(item);
        }),


        //DONE!
        //Expects anything
        isBoolean: whcgMy.my.curry(function (obj) {
            if (typeof obj === 'boolean' || obj instanceof Boolean) {
                return true;
            } else {
                return false;
            }
        }),

        //DONE!
        //Expects anything
        isArray: whcgMy.my.curry(function (obj) {
            if (Array.isArray(obj)) {
                return true;
            } else {
                return false;
            }
        }),

        //DONE!
        //Expects anything
        isString: whcgMy.my.curry(function (obj) {
            if (typeof obj === 'string' || obj instanceof String) {
                return true;
            } else {
                return false;
            }
        }),

        //DONE!
        //Expects anything
        isObject: whcgMy.my.curry(function (obj) {
            if (h.boolean.isString(obj)) {
                return false;
            }
            if (h.boolean.isNumberType(obj)) {
                return false;
            }
            if (h.boolean.isArray(obj)) {
                return false;
            }

            if (h.boolean.isNull(obj)) {
                return false;
            }
            if (typeof obj === 'object' || obj instanceof Object) {
                return true;
            } else {
                return false;
            }
        }),

        //DONE!
        //Expects anything
        isNumberType: whcgMy.my.curry(function (obj) {
           
            if (h.boolean.isString(obj)) {
                return false;
            }

            if (h.boolean.isArray(obj)) {
                return false;
            }
            if (h.boolean.isBoolean(obj)) {
                return false;
            }
            if (!h.boolean.isDefined(obj)) {
                return false; 
            }

            if (h.boolean.isNull(obj)) {
                return false; 
            }
            return !isNaN(obj);
        }),

        //DONE!
        //Expects anything
        isNumber: whcgMy.my.curry(function (obj) {
            if (h.boolean.isBoolean(obj)) {
                return false;
            }
            if (h.boolean.isArray(obj)) {
                return false;
            }

            if (!h.boolean.isDefined(obj)) {
                return false; 
            }

            if (h.boolean.isNull(obj)) {
                return false; 
            }

            if (obj === '') {
                return false; 
            }

            if (obj == '0') {
                return true;
            } else {
                return !isNaN(obj);
            }
        }),

        //DONE!
        //Expects "number"
        // TODO: change to not accept e.g. 3.0 as integer.
        isInteger: whcgMy.my.curry(function (obj) {
            if(!h.boolean.isNumber(obj)) {
                throw 'Parameter is not a "Number"';
            } 

            if (!h.boolean.isNumberType(obj)){
                obj = Number(obj);
            }
            return Number.isInteger(obj);
        }),

        //DONE!
        //Expects integer
        isEvenInteger: whcgMy.my.curry(function (x) { 
            if(!h.boolean.isInteger(x)) {
                throw 'Parameter is not an integer';   
            }
            return (x % 2 === 0);
        }),

        //DONE!
        //Expects integer
        isOddInteger: whcgMy.my.curry(function (x) {
            if(!h.boolean.isInteger(x)) {
                throw 'Parameter is not an integer';   
            }
            return (x % 2 !== 0);
        }),


        //DONE!
        //Expects numbertype
        // TODO: change to not accept e.g. 3.0 as integer.
        isIntegerAndNumberType: whcgMy.my.curry(function (obj) {
            if(!h.boolean.isNumberType(obj)) {
                throw 'Parameter is not a numbertype';
            } 
            return Number.isInteger(obj);
           
        }),

        //DONE!
        //Expects integer of numbertype
        isEvenIntegerAndNumberType: whcgMy.my.curry(function (x) {
            if(!h.boolean.isIntegerAndNumberType(x)) {
                throw 'Parameter is not an integer';   
            }
            return (x % 2 === 0);
        }),

        //DONE!
        //Expects integer of numbertype
        isOddIntegerAndNumberType: whcgMy.my.curry(function (x) {
            if(!h.boolean.isIntegerAndNumberType(x)) {
                throw 'Parameter is not an integer';   
            }
            return (x % 2 !== 0);
        }),

        //DONE!
        //Expects strings
        /**
         * Tries if the last character is equal to the test character
         */
        stringEndsWithCharacter: whcgMy.my.curry(function (str, test) {
            if (!h.boolean.isString(str) || !h.boolean.isString(test)) {
                throw 'Parameter is not a string';
            }

            if (test.length !== 1) {
                throw 'Length of test string parameter is not one';
            }

            if (str.length === 0) {
                throw 'Length of string parameter is zero';
            }

            return str.substring(str.length - 1) === test;
        }),

        //DONE!
        //Expects strings
        /**
         * Tries if the last character is equal to the test character
         */
        stringEndsWithCharacters: whcgMy.my.curry(function (str, test) {
            if (!h.boolean.isString(str) || !h.boolean.isString(test)) {
                throw 'Parameter is not a string';
            }

            if (test.length === 0) {
                throw 'Length of test string parameter is zero';
            }

            if (str.length === 0) {
                throw 'Length of string parameter is zero';
            }

            if (str.length < test.length) {
                throw 'Length of string parameter is less than length of test parameter';
            }

            return str.substring(str.length - test.length) === test;
        }),

        //DONE!
        //Expects strings
        stringStartsWithCharacter: whcgMy.my.curry(function (str, test) {
            if (!h.boolean.isString(str) || !h.boolean.isString(test)) {
                throw 'Parameter is not a string';
            }

            if (test.length !== 1) {
                throw 'Length of test string parameter is not one';
            }

            if (str.length === 0) {
                throw 'Length of string parameter is zero';
            }
            return str.slice(0, 1) === test;
        }),

        //DONE!
        //Expects strings
        stringStartsWithCharacters: whcgMy.my.curry(function (str, test) {
            if (!h.boolean.isString(str) || !h.boolean.isString(test)) {
                throw 'Parameter is not a string';
            }

            if (test.length === 0) {
                throw 'Length of test string parameter is zero';
            }

            if (str.length === 0) {
                throw 'Length of string parameter is zero';
            }

            if (str.length < test.length) {
                throw 'Length of string parameter is less than length of test parameter';
            }
            return str.slice(0, test.length) === test;
        }),


        //TODO: Working, but I don't understand what it does...
        isUnique: whcgMy.my.curry(function(value, index, self) {
            return self.indexOf(value) === index;
        })
    };



    //Strings
    this.str = {

        //DONE!
        adder: whcgMy.my.curry(function (acc, nextString) {
            return acc + nextString;
        }),

        //DONE!
        adderUsingSplitter: whcgMy.my.curry(function (acc, nextString, splitter) {
            return acc + splitter + nextString;
        }),

        //DONE!
        stringToArrayUsingSplitter: whcgMy.my.curry(function (splitter, string) {
            return string.split(splitter);
        }),


        //DONE
        toUpperCase: whcgMy.my.curry(function (text) {
            return text.toUpperCase();
        }),

        //DONE
        firstLettertoUpperCase: whcgMy.my.curry(function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }),

        //DONE
        firstLettertoLowerCase: whcgMy.my.curry(function (string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }),

        //DONE
        toLowerCase: whcgMy.my.curry(function (text) {
            return text.toLowerCase();
        }),

        //DONE!
        /**
         * Returns the first word from a string
         */
        //Expects strings
        getFirstWordFromString: whcgMy.my.curry(function (str) {
            return str.split(' ').slice(0, 1).join(' ');
        }),

        //DONE!
        /**
         * Returns first word from a string using splitter
         */
        getFirstWordFromStringUsingSpliter: whcgMy.my.curry(function (str, splitter) {
            return str.split(splitter).slice(0, 1).join(' ');
        }),

        //DONE!
        /**
         * Returns the last word from a string
         */
        getLastWordFromString: whcgMy.my.curry(function (str) {
            return str.split(' ').pop();
        }),

        //DONE!
        /**
         * Returns the last word from a string using splitter
         */
        getLastWordFromStringUsingSpliter: whcgMy.my.curry(function (str, splitter) {
            return str.split(splitter).pop();
        }),

        //DONE!
        /**
         * Returns the first words from a string
         */
        getFirstWordsFromString: whcgMy.my.curry(function (str, count) {
            return str.split(' ').slice(0, count).join(' ');
        }),

        //DONE!
        /**
         * Returns the first words from a string using splitter
         */
        getFirstWordsFromStringUsingSplitter: whcgMy.my.curry(function (str, count, splitter) {
            return str.split(splitter).slice(0, count).join(splitter);
        }),

        //DONE
        /**
         * Returns the last words from a string
         */
        getLastWordsFromString: whcgMy.my.curry(function (str, count) {
            return str.split(' ').slice(count, str.length).join(' ');
        }),

        //DONE
        /**
         * Returns the last words from a string
         */
        getLastWordsFromStringUsingSplitter: whcgMy.my.curry(function (str, count, splitter) {
            return str.split(splitter).slice(count, str.length).join(splitter);
        }),

        //DONE
        /**
         * Removes first word from a string and returns the rest
         */
        removeFirstWordFromString: whcgMy.my.curry(function (str) {
            return str.split(' ').slice(1).join(' ');
        }),

        //DONE
        /**
         * Removes first word from a string and returns the rest
         */
        removeFirstWordFromStringUsingSplitter: whcgMy.my.curry(function (str, splitter) {
            return str.split(splitter).slice(1).join(' ');
        }),

        //DONE
        /**
         * Removes the last word from at string and returns the mod string
         */
        removeLastWordFromString: whcgMy.my.curry(function (str) {
            //var shortStr = str.split(" ").pop();
            var strArr = str.split(' ');
            strArr.pop();
            var newStr = strArr.join(' ');
            return newStr;
        }),

        //DONE
        /**
         * Removes the last word from at string and returns the mod string
         */
        removeLastWordFromStringUsingSplitter: whcgMy.my.curry(function (str, splitter) {
            //var shortStr = str.split(" ").pop();
            var strArr = str.split(splitter);
            strArr.pop();
            var newStr = strArr.join(' ');
            return newStr;
        }),

        removeLastWordFromStringUsingSplitterAndKeepSplitters: whcgMy.my.curry(function (str, splitter) {
            //var shortStr = str.split(" ").pop();
            var strArr = str.split(splitter);
            strArr.pop();
            var newStr = strArr.join(splitter);
            return newStr;
        }),

        /**
         * Removes first words from a string and returns the rest
         */
        removeFirstWordsFromString: whcgMy.my.curry(function (str, count) {
            return str.split(' ').slice(count).join(' ');
        }),

        //DONE
        /**
         * Removes first words from a string and returns the rest
         */
        removeFirstWordsFromStringUsingSplitter: whcgMy.my.curry(function (str, count, splitter) {
            return str.split(splitter).slice(count).join(splitter);
        }),

        //DONE
        /**
         * Removes the last words from a string
         */
        removeLastWordsFromString: whcgMy.my.curry(function (str, count) {
            return str.split(' ').slice(0, -count).join(' ');
        }),

        //DONE
        /**
         * Removes the last words from a string
         */
        removeLastWordsFromStringUsingSplitter: whcgMy.my.curry(function (str, count, splitter) {
            return str.split(splitter).slice(0, -count).join(splitter);
        }),

        //DONE
        /**
         * Converts a string into number
         */
        convertStringToNumber: whcgMy.my.curry((str) => {
            return Number(str);
        })
    };


    //Arrays
    this.arr = {
        // TODO: Do a swop function

        
        //DONE
        flatten: whcgMy.my.curry(function (arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? h.arr.flatten(toFlatten) : toFlatten);
            }, []);
        }),

        //DONE
        seqArrayFromLength: whcgMy.my.curry(function (length) {
            let seqArray = new Array(length);

            for (let i = 1; i <= length; i++) {
                seqArray[i] = i;
            }
            return seqArray;
        }),

        //DONE
        seqArrayFromTo: whcgMy.my.curry(function (from, to) {
            let seqArray = [];

            for (let i = from; i <= to; i++) {
                seqArray.push(i);
            }
            return seqArray;
        }),



        mapm: whcgMy.my.curry(function (reducer, arrs) {
            let count = undefined;
            arrs.forEach(function (arr) {
                if (count === undefined || arr.length < count)
                    count = arr.length;
            });

            const result = [];
            for (let i = 0; i < count; i++) {
                const args = [];
                arrs.forEach(function (arr) {
                    args.push(arr[i]);
                });

                const interm = args.reduce(reducer);
                result.push(interm);
            }
            return result;
        }),

        //DONE
        sortArray: whcgMy.my.curry(function (arrayToSort, sortBy, direction) {

            let sortedArray = arrayToSort.sort(function (a, b) {
                let dirValue = 1;
                if (direction === 'asc') {
                    dirValue = -dirValue;
                }

                if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
                    return dirValue;
                } else if (a[sortBy].toLowerCase() == b[sortBy].toLowerCase()) {
                    return 0;
                } else {
                    return -dirValue;
                }
            });

            return sortedArray;
        })
    };




    //DOM
    this.dom = {

        //DONE
        appendInnerHTMLIO: whcgMy.my.curry(function (inner, outer) {
            outer.innerHTML = inner;
            return outer;
        }),

        //DONE
        appendInnerHTMLOI: whcgMy.my.curry(function (el, inner) {
            el.innerHTML = inner;
            return el;
        }),

        //DONE
        wrapStringInTag: whcgMy.my.curry(function (tag, str) {
            return '<' + tag + '>' + str + '</' + tag + '>';
        }),

        //DONE
        /**
         * Appends child node to parent last
         * @param child the inner element 
         * @param parent the outer element
         */
        appendChildNodeIO: whcgMy.my.curry(function (child, parent) {
            parent.appendChild(child);
            return parent;
        }),


        /**
         * Appends child node to parent first 
         * @param child the inner element 
         * @param parent the outer element
         */
        appendChildNodeFirstIO: whcgMy.my.curry(function (child, parent) {
            parent.insertBefore(child, parent.childNodes[0]);
            return parent;
        }),

        appendChildNodeAtPositionIO: whcgMy.my.curry(function (position, child, parent) {
            parent.insertBefore(child, parent.childNodes[position]);
            return parent;
        }),

        //DONE
        appendChildNodeOI: whcgMy.my.curry(function (el, child) {
            el.appendChild(child);
            return el;
        }),

        //DONE
        appendChildNodesOnId: whcgMy.my.curry(function (builtElements, id) {
            let myId = h.dom.getElement('id', id);
            builtElements.forEach((builtElement) => {
                h.dom.appendChildNodeIO(builtElement, myId);
            });

            return myId;
        }),

        //DONE
        appendChildNodesIO: whcgMy.my.curry(function (builtElements, parentElement) {
            builtElements.forEach((builtElement) => {
                h.dom.appendChildNodeIO(builtElement, parentElement);
            });

            return parentElement;
        }),

        //DONE
        appendChildNodesOI: whcgMy.my.curry(function (parentElement, builtElements) {
            builtElements.forEach((builtElement) => {
                h.dom.appendChildNodeOI(parentElement, builtElement);
            });

            return parentElement;
        }),

        //DONE
        removeChildrenUntil: whcgMy.my.curry(function (el, numb) {
            while (el.children.length > numb) {
                el.removeChild(el.lastChild);
            }

            return el;
        }),

        //NOT DONE
        appendSiblingNodeCS: whcgMy.my.curry(function (el, sibling) {
            el.insertAdjacentElement('afterend', sibling);
            return el;
        }),

        //DONE
        boxChecker: whcgMy.my.curry(function (el) {
            el.checked = true;
            return el;
        }),

        //DONE
        boxUnchecker: whcgMy.my.curry(function (el) {
            el.checked = false;
            return el;
        }),

        //DONE
        /**
         * Creates element. @param tag kind of element
         */
        createElement: whcgMy.my.curry(function (tag) {
            return document.createElement(tag);
        }),

        //DONE
        /**
         * Gets element. @param kind ether "id" or "class" @param name the name of the kind
         */
        getElement: whcgMy.my.curry(function (kind, name) {
            switch (kind) {
                case 'id':
                    return document.getElementById(name);
                case 'class':
                    return document.getElementsByClassName(name);
                case 'tag':
                    return document.getElementsByTagName(name);
            }
        }),

        //makes a node list with the specified attribute from from DOM. Slices the node list into an array
        getAllElementsByAttribute: whcgMy.my.curry(function (elementAtrribute) {
            return [].slice.call(document.querySelectorAll(elementAtrribute));
        }),

        //DONE
        getAttribute: whcgMy.my.curry(function (attribute, el) {
            return el.getAttribute(attribute);
        }),

        //DONE
        /**
         * Sets attribute to element 
         * @param {string} key 
         * @param {*} value 
         * @param  el the element
         */
        setAttribute: whcgMy.my.curry(function (key, value, el) {
            el.setAttribute(key, value);
            return el;
        }),

        //DONE
        setStyle: whcgMy.my.curry(function (key, value, el) {
            el.style[key] = value;
            return el;
        }),

        //DONE
        /**
         * Creates a new element
         */
        elementBuilder: whcgMy.my.curry(function (testingObject, db) {
            //check if element exists
            if (h.boolean.isDefined(testingObject.kind)) {

                //create element
                let element = h.dom.createElement(testingObject.kind);

                //sets attributes
                if (h.boolean.isDefined(testingObject.attribute)) {
                    testingObject.attribute.forEach(function (item) {
                        h.dom.setAttribute(item.key, item.value, element);
                    });
                }

                //sets style
                if (h.boolean.isDefined(testingObject.style)) {
                    testingObject.style.forEach(function (item) {
                        h.dom.setStyle(item.key, item.value, element);
                    });
                }

                //sets textNode
                if (h.boolean.isDefined(testingObject.textNode)) {
                    testingObject.textNode.forEach(function (item) {
                        let tempTextNode = document.createTextNode(item);
                        h.dom.appendChildNodeIO(tempTextNode, element);
                    });
                }

                //sets eventlistender
                testingObject.event.forEach(function (item) {
                    element.addEventListener(item.key, function (event) {
                        item.value(event, db);
                    });
                });

                return element;
            }
        }),

        //DONE
        /**
         * Constructs an empty element info object
         */
        ElementInfoConstructor: whcgMy.my.curry(function () {
            this.kind = '';
            this.attribute = [];
            this.style = [];
            this.textNode = [];
            this.event = [];
        })


    };

    //EVENT
    this.event = {

        // deleteLastDocWithFilter: my.curry(function (event, db) { //CHANGE FUNCTION NAME!
        //     let kind = event.target.attributes.kind.value;

        //     return h.pouch.getAllRowsWithFilter(db, kind)
        //         .then((filteredRows) => {
        //             return h.pouch.getLastRowOfKind(filteredRows);  
        //         })
        //         .then((lastRow) => {
        //             let idOfDocPreviousH;
        //             idOfDocPreviousH = lastRow.doc.previousH;
        //             idOfDocToRemove = lastRow.doc._id;
        //             if (idOfDocPreviousH !== 'first') {
        //                 let parameters = [
        //                     {
        //                         key: 'nextH',
        //                         value: 'last'
        //                     }
        //                 ]
        //                 return h.pouch.editDocByIdAndPut(idOfDocPreviousH, db, parameters)
        //                     .then(() => {
        //                         return h.pouch.deleteDocById(idOfDocToRemove, db);
        //                     });
        //             } else {
        //                 return h.pouch.deleteDocById(idOfDocToRemove, db);
        //             }
        //         })
        //         .then(() => {
        //             return h.pouch.getAllRowsWithFilter(db, kind);
        //         })
        //         .then((filteredRows) => {
        //             return removeFromDom(filteredRows, kind); 
        //         })
        //         .catch((obj) => {
        //             console.log('rejected!!');   
        //         });  
        // }),



        deleteFirstDocWithFilter: whcgMy.my.curry(function (kind, parentIdValue, db) { //CHANGE FUNCTION NAME!
            let lastWordOfKind = h.str.getLastWordFromStringUsingSpliter(kind, '-');
            let kindName = h.str.getFirstWordFromStringUsingSpliter(kind, '-');
            let idOfDocNext;
            let previous;
            let idOfDocToRemove;
            let children;

            function reqfunc(i, childId) {
                return h.event.deleteFirstDocWithFilter(kind + '-element', idOfDocToRemove, db)
                    .then(() => {
                        i = i + 1;
                        if (i < children.length) {
                            return reqfunc(i, children[i].doc._id);
                        } else {
                            return h.event.deleteFirstDocWithFilter(kind, parentIdValue, db);
                        }
                    });
            }

            function reqfuncSection(i, childId) {
                return h.event.deleteFirstDocWithFilter(kindName + '-row', idOfDocToRemove, db)
                    .then(() => {
                        i = i + 1;
                        if (i < children.length) {
                            return reqfuncSection(i, children[i].doc._id);
                        } else {
                            return h.event.deleteFirstDocWithFilter(kind, parentIdValue, db);
                        }
                    });
            }


            return h.pouch.getAllRowsWithFilter(db, kind)
                .then((filteredRows) => {

                    if (lastWordOfKind === 'section') {
                        return h.pouch.getFirstRowOfSectionOrRow(filteredRows)
                            .then((firstRow) => {

                                idOfDocToRemove = firstRow.doc._id;

                                return h.pouch.getAllRowsWithFilter(db, kindName + '-row')
                                    .then((filteredElementRows) => {
                                        children = filteredElementRows.filter((filteredElementRow) => {
                                            return filteredElementRow.doc.parentId === idOfDocToRemove;
                                        });
                                    });
                            });
                    } else if (lastWordOfKind === 'row') {
                        return h.pouch.getFirstRowOfSectionOrRow(filteredRows)
                            .then((firstRow) => {


                                idOfDocToRemove = firstRow.doc._id;

                                return h.pouch.getAllRowsWithFilter(db, kind + '-element')
                                    .then((filteredElementRows) => {
                                        children = filteredElementRows.filter((filteredElementRow) => {
                                            return filteredElementRow.doc.parentId === idOfDocToRemove;
                                        });

                                    });
                            });
                    } else {
                        return true;
                    }


                })
                .then(() => {
                    if ((lastWordOfKind === 'row') && (h.boolean.isEmpty(children) === false)) {
                        return reqfunc(0, children[0].doc._id);
                    } else if ((lastWordOfKind === 'section') && (h.boolean.isEmpty(children) === false)) {
                        return reqfuncSection(0, children[0].doc._id);
                    } else {
                        return h.pouch.getAllRowsWithFilter(db, kind)
                            .then((filteredRows) => {

                                if (lastWordOfKind === 'element') {
                                    return h.pouch.getFirstRowOfElement(filteredRows, parentIdValue);
                                } else {
                                    return h.pouch.getFirstRowOfSectionOrRow(filteredRows);
                                }
                            })
                            .then((firstRow) => {

                                if (lastWordOfKind === 'element') {
                                    idOfDocNext = firstRow.doc.nextH;
                                    previous = 'previousH';
                                } else {
                                    idOfDocNext = firstRow.doc.nextV;
                                    previous = 'previousV';
                                }

                                idOfDocToRemove = firstRow.doc._id;

                                if (idOfDocNext !== 'last') {
                                    let parameters = [{
                                        key: previous,
                                        value: 'first'
                                    }];
                                    return h.pouch.editDocByIdAndPut(idOfDocNext, db, parameters)
                                        .then(() => {
                                            return h.pouch.deleteDocById(idOfDocToRemove, db);
                                        });
                                } else {
                                    return h.pouch.deleteDocById(idOfDocToRemove, db);
                                }

                            })
                            .then((response) => {
                                removeFromController(response, db, lastWordOfKind, 'first');

                                response.id = idOfDocNext;

                                if (response.id !== 'last') {
                                    return updatePosition(response, db);
                                }

                                return true;

                            })
                            .then(() => {
                                return h.pouch.getAllRowsWithFilter(db, kind);
                            })
                            .then((filteredRows) => {
                                if (h.str.getLastWordFromStringUsingSpliter(kind, '-') === 'row') {
                                    return removeRowFromDom(filteredRows, kind, parentIdValue);
                                } else if (h.str.getLastWordFromStringUsingSpliter(kind, '-') === 'section') {
                                    return removeSectionFromDom(filteredRows, kind);
                                } else {
                                    return removeElementFromDom(filteredRows, kind, parentIdValue);
                                }

                            })
                            .catch((obj) => {
                                console.log('rejected!!');
                            });
                    }
                });
        }),

        deleteFirstDocFromEvent: whcgMy.my.curry(function (event, db) {
            let kind = event.target.attributes.kind.value;
            let parentIdValue = event.target.attributes.parentId.value;

            h.event.deleteFirstDocWithFilter(kind, parentIdValue, db);
        }),


        addOneDocFirstFromEvent: whcgMy.my.curry(function (event, db) {
            let kind = event.target.attributes.kind.value;
            let parentIdValue = event.target.attributes.parentId.value;

            let level = h.str.getLastWordFromStringUsingSpliter(kind, '-');
            let kindExceptLevelWithSpaceSeparators = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
            let kindExceptLevel = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(kind, '-');

            if (kind === 'section') {
                let element = h.dom.getElement('id', 'inputSectionName');
                let sectionName = h.dom.getAttribute('value', element);
                kind = sectionName + '-section';
            }

            return h.event.addOneDocFirstWithFilter(kind, parentIdValue, db)
                .then((row) => {
                    return updateDOMWithDocContent(level, row, kind, kindExceptLevelWithSpaceSeparators, db, 'first');
                });
        }),

        addOneDocLastFromEvent: whcgMy.my.curry(function (event, db) {
            let kind = event.target.attributes.kind.value;
            let parentIdValue = event.target.attributes.parentId.value;

            let level = h.str.getLastWordFromStringUsingSpliter(kind, '-');
            let kindExceptLevelWithSpaceSeparators = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
            let kindExceptLevel = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(kind, '-');

            if (kind === 'section') {
                let element = h.dom.getElement('id', 'inputSectionName');
                let sectionName = h.dom.getAttribute('value', element);
                kind = sectionName + '-section';
            }

            return h.event.addOneDocLastWithFilter(kind, parentIdValue, db)
                .then((row) => {
                    return updateDOMWithDocContent(level, row, kind, kindExceptLevelWithSpaceSeparators, db, 'last');
                });
        }),

        /**
         * 
         * @param kind (name-section)(name-row)(name-row-element)
         * @param parentIdValue
         * @param db
         */
        addOneDocFirstWithFilter: whcgMy.my.curry(function (kind, parentIdValue, db) {

            let level = h.str.getLastWordFromStringUsingSpliter(kind, '-');
            let kindExceptLevelWithSpaceSeparators = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
            let kindExceptLevel = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(kind, '-');

            let nextKey;
            let previousKey;
            let nextValue;
            let previousValue;

            if (level === 'section' || level === 'row') {
                nextKey = 'nextV';
                previousKey = 'previousV';
            } else {
                nextKey = 'nextH';
                previousKey = 'previousH';
            }

            //return h.pouch.getAllRowsWithFilter(db, kind)
            return h.pouch.getAllRowsWithParentId(db, parentIdValue)

                //get db row pointing at first
                .then((rowsWithSameParentId) => {
                    return h.pouch.getRowPointingAtFirst(rowsWithSameParentId, previousKey);
                })
                .then((rowPointingAtFirst) => {

                    let pointers = {};

                    pointers = h.pouch.setPointersForDocumentAddedFirst(rowPointingAtFirst[0]);

                    nextValue = pointers.nextKey;
                    previousValue = pointers.previousKey;



                    //creates new document attributes in db
                    let attributes = [{
                            key: 'elementValue',
                            value: ''
                        },
                        {
                            key: previousKey,
                            value: previousValue
                        },
                        {
                            key: nextKey,
                            value: nextValue
                        },
                        {
                            key: 'kind',
                            value: kind
                        },
                        {
                            key: 'parentId',
                            value: parentIdValue
                        }
                    ];

                    //creates new doc to be posted in db
                    return h.pouch.createDoc(db, attributes)
                        .then((doc) => {
                            return h.pouch.postDoc(doc, db);
                        })
                        .then((response) => {
                            console.log('Doc Posted');
                            console.log(response);
                            addToController(response, db, level, 'first');
                            return updatePosition(response, db);
                        })
                        .then((response) => {
                            if (level === 'element') {
                                return addVerticalPositionToElement(db, response);
                            } else {
                                return response;
                            }
                        })
                        .then((response) => {
                            return updatePreviousKeyOfPreviouslyFirstDoc(rowPointingAtFirst, nextValue, response, previousKey, db);
                        })
                        //gets latest row from db
                        .then(() => {
                            return h.pouch.getLatestRowWithFilter(db, kind);
                        })
                    //creates a new element and places it as child to parent in DOM first
                    ;
                });
        }),

        /**
         * 
         * @param event
         * @param db
         */
        addOneDocLastWithFilter: whcgMy.my.curry(function (kind, parentIdValue, db) {

            let lastWordOfKind = h.str.getLastWordFromStringUsingSpliter(kind, '-');
            let allButLastWordOfKind = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
            let allButLastWordOfKindKeepingSplitters = h.str.removeLastWordFromStringUsingSplitterAndKeepSplitters(kind, '-');

            let nextKey;
            let previousKey;
            let nextValue;
            let previousValue;

            if (lastWordOfKind === 'section' || lastWordOfKind === 'row') {
                nextKey = 'nextV';
                previousKey = 'previousV';
            } else {
                nextKey = 'nextH';
                previousKey = 'previousH';
            }

            //return h.pouch.getAllRowsWithFilter(db, kind)
            return h.pouch.getAllRowsWithParentId(db, parentIdValue)


                //search for the first row
                .then((filteredRows) => {
                    console.log('one');
                    return h.pouch.getRowPointingAtLast(filteredRows, nextKey);
                })
                .then((lastRow) => {
                    console.log('two');
                    let pointers = {};

                    pointers = h.pouch.setPointersForDocumentAddedLast(lastRow[0]);

                    nextValue = pointers.nextKey;
                    previousValue = pointers.previousKey;



                    //creates new document attributes in db
                    let attributes = [{
                            key: 'elementValue',
                            value: ''
                        },
                        {
                            key: previousKey,
                            value: previousValue
                        },
                        {
                            key: nextKey,
                            value: nextValue
                        },
                        {
                            key: 'kind',
                            value: kind
                        },
                        {
                            key: 'parentId',
                            value: parentIdValue
                        }
                    ];

                    //creates new doc to be posted in db
                    return h.pouch.createDoc(db, attributes)
                        .then((doc) => {
                            console.log('three');
                            return h.pouch.postDoc(doc, db);
                        })
                        .then((response) => {
                            return updatePositionAddedLast(response, db);
                        })
                        .then((response) => {
                            return addVerticalPositionToElement(db, response);
                        })
                        .then((response) => {
                            return updateNextKeyOfPreviouslyLastDoc(lastRow, previousValue, response, nextKey, db);
                        })
                        //gets latest row from db
                        .then(() => {
                            return h.pouch.getLatestRowWithFilter(db, kind);
                        })
                    //creates a new element and places it as child to parent in DOM first
                    ;
                });

        }),




        deleteAllDocsWithFilter: whcgMy.my.curry(function (event, db) {
            let elementIdKind = event.target.attributes.kind.value;
            h.pouch.deleteAllRowsWithFilter(db, elementIdKind)
                .then(() => {
                    return h.pouch.getAllRows(db);
                })
                .then((rows) => {
                    return removeFromDom(rows, elementIdKind);
                });
        }),

        addSelectedNumberOfDocsWithFilter: whcgMy.my.curry(function (event, db) {
            let selectedValue;
            let elementIdKind;

            selectedValue = h.str.convertStringToNumber(event.target.value);
            elementIdKind = event.target.attributes.kind.value;

            h.pouch.getNewElementIdNumber(db, elementIdKind)
                .then((newElementIdNumber) => {
                    let newElementIdNumbers = h.arr.seqArrayFromTo(newElementIdNumber, (newElementIdNumber + selectedValue - 1));
                    return newElementIdNumbers;
                })
                .then((newElementIdNumbers) => {
                    return h.pouch.createDocs(db, newElementIdNumbers, elementIdKind);
                })
                .then((docs) => {
                    return h.pouch.postDocs(docs, db);
                });
        }),

        detectClickFunction: whcgMy.my.curry(function (event, db) {
            return console.log(event);
        }),

        detectKeybordFunction: whcgMy.my.curry(function (event, db) {
            let keyPressed = event.whitch || event.keyCode || event.charCode;
            if (keyPressed === 13) {
                event.preventDefault();
                let element = event.target;
                let elementValue = element.value;
                let docId = h.dom.getAttribute('dbid', element);
                h.dom.setAttribute('value', elementValue, element);

                let parameters = [{
                    key: 'elementValue',
                    value: elementValue
                }];
                h.pouch.editDocByIdAndPut(docId, db, parameters)
                    .then(() => {
                        return h.pouch.getDoc(docId, db);
                    })
                    .then((doc) => {
                        events.publish('changedCellValue', {
                            value: elementValue,
                            sectionName: h.str.removeLastWordsFromStringUsingSplitter(doc.kind, 2, '-'),
                            positionH: doc.positionH,
                            positionV: doc.positionV,
                            doc: doc
                        });
                    });


                event.target.blur();
            }
        }),

        detectBlurFunction: whcgMy.my.curry(function (event, db) {
            event.preventDefault();
            let element = event.target;
            let elementValue = element.value;
            let dbId = h.dom.getAttribute('dbid', element);
            h.dom.setAttribute('value', elementValue, element);

            let parameters = [{
                key: 'elementValue',
                value: elementValue
            }];
            h.pouch.editDocByIdAndPut(dbId, db, parameters)
                .then(() => {
                    return h.pouch.getDoc(docId, db);
                });
        })
    };

    //POUCH
    this.pouch = {

        //DONE
        fetchAll: whcgMy.my.curry(function (db) {
            return db.allDocs({
                include_docs: true,
                conflicts: true
            });
        }),

        //DONE
        deleteDoc: whcgMy.my.curry(function (doc, db) {
            return new Promise(function (resolve, reject) {
                doc._deleted = true;
                doc.written = new Date().toISOString();
                resolve(db.put(doc));
            });
        }),

        //DONE
        deleteDocById: whcgMy.my.curry(function (docId, db) {
            return h.pouch.getDoc(docId, db)
                .then((doc) => h.pouch.deleteDoc(doc, db));
        }),

        //DONE
        getDoc: whcgMy.my.curry(function (docId, db) {
            return db.get(docId, {
                conflicts: true,
                include_docs: true
            });
        }),

        //DONE
        postDoc: whcgMy.my.curry(function (doc, db) {
            return db.put(doc);
        }),

        //DONE
        putDoc: whcgMy.my.curry(function (doc, db) {
            return db.put(doc);
        }),

        //DONE
        postDocs: whcgMy.my.curry(function (docs, db) {
            return db.bulkDocs(docs);
        }),

        //DONE
        deleteRows: whcgMy.my.curry(function (rows, db) {
            return rows.forEach((row) => {
                h.pouch.deleteDoc(row.doc, db);
            });
        }),

        //DONE
        deleteAllRowsWithFilter: whcgMy.my.curry(function (db, filter) {
            return h.pouch.getAllRowsWithFilter(db, filter)
                .then((filteredRows) => {
                    return h.pouch.deleteRows(filteredRows, db);
                });
        }),

        //DONE
        /**
         * Deletes last added row in db
         * @param db the database
         * @param kind section to filter. Rent etc.
         */
        deleteLastRowWithFilter: whcgMy.my.curry(function (db, kind) {
            return h.pouch.getAllRowsWithFilter(db, kind)
                .then((filteredRows) => {
                    let sortedFilteredRows = h.pouch.sortRows(filteredRows, 'id', 'desc');

                    //select last doc and delete it
                    if (!h.boolean.isEmpty(sortedFilteredRows)) {
                        let idOfDocToRemove = sortedFilteredRows[0].id;
                        return h.pouch.deleteDocById(idOfDocToRemove, db);
                    }

                });
        }),

        //DONE
        getAllRows: whcgMy.my.curry(function (db) {
            return h.pouch.fetchAll(db)
                .then((docs) => {
                    return docs.rows;
                });
        }),

        //DONE
        getAllRowsWithFilter: whcgMy.my.curry(function (db, filter) {

            //IF SECTION
            if (h.str.getLastWordFromStringUsingSpliter(filter, '-') === 'section') {
                return h.pouch.getAllRows(db)
                    .then((rows) => {
                        let filteredRows = rows.filter((row) => {
                            return h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'section';
                        });
                        return filteredRows;
                    });
            }

            //IF ROW OR ELEMENT
            else {
                return h.pouch.getAllRows(db)
                    .then((rows) => {
                        let filteredRows = rows.filter((row) => {
                            return row.doc.kind === filter;
                        });
                        return filteredRows;
                    });

            }


        }),

        //DONE
        getAllRowsWithLevel: whcgMy.my.curry(function (db, level) {

            //IF SECTION
            if (level === 'section') {
                return h.pouch.getAllRows(db)
                    .then((rows) => {
                        let filteredRows = rows.filter((row) => {
                            return h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'section';
                        });
                        return filteredRows;
                    });
            }

            if (level === 'row') {
                return h.pouch.getAllRows(db)
                    .then((rows) => {
                        let filteredRows = rows.filter((row) => {
                            return h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'row';
                        });
                        return filteredRows;
                    });
            }

            if (level === 'element') {
                return h.pouch.getAllRows(db)
                    .then((rows) => {
                        let filteredRows = rows.filter((row) => {
                            return h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'element' || h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'summary';
                        });
                        return filteredRows;
                    });
            }

            if (level === 'summary') {
                return h.pouch.getAllRows(db)
                    .then((rows) => {
                        let filteredRows = rows.filter((row) => {
                            return h.str.getLastWordFromStringUsingSpliter(row.doc.kind, '-') === 'summary';
                        });
                        return filteredRows;
                    });
            }


        }),

        getAllRowsWithParentId: whcgMy.my.curry(function (db, filter) {
            return h.pouch.getAllRows(db)
                .then((rows) => {
                    let filteredRows = rows.filter((row) => {
                        return row.doc.parentId === filter;
                    });
                    return filteredRows;
                });
        }),

        getAllRowsOfLevel: whcgMy.my.curry(function (db, level) {
            return h.pouch.getAllRows(db)
                .then((rows) => {
                    let filteredRows = rows.filter((row) => {
                        return row.doc.level === level;
                    });
                    return filteredRows;
                });
        }),

        //DONE
        getLatestRowWithFilter: whcgMy.my.curry(function (db, filter) {
            return h.pouch.getAllRowsWithFilter(db, filter)
                .then((filteredRows) => {
                    let sortedFilteredRows = h.pouch.sortRows(filteredRows, 'id', 'desc');
                    if (!h.boolean.isEmpty(sortedFilteredRows)) {
                        return sortedFilteredRows[0];
                    }
                });
        }),

        getLatestRowOfLevel: whcgMy.my.curry(function (db, level) {
            return h.pouch.getAllRowsOfLevel(db, level)
                .then((filteredRows) => {
                    let sortedFilteredRows = h.pouch.sortRows(filteredRows, 'id', 'desc');
                    if (!h.boolean.isEmpty(sortedFilteredRows)) {
                        return sortedFilteredRows[0];
                    }
                });
        }),



        getRowPointingAtFirst: whcgMy.my.curry(function (rows, previousKey) {
            let firstRow = [];
            firstRow = rows.filter((row) => {
                return row.doc[previousKey] === 'first';
            });

            return (firstRow);
        }),

        getRowsPointingAtFirst: whcgMy.my.curry(function (rows, previousKey) {
            let firstRow = [];
            firstRow = rows.filter((row) => {
                return row.doc[previousKey] === 'first';
            });

            return (firstRow);
        }),

        getRowPointingAtLast: whcgMy.my.curry(function (rows, nextKey) {
            let lastRow = [];
            lastRow = rows.filter((row) => {
                return row.doc[nextKey] === 'last';
            });

            return (lastRow);
        }),



        //DONE
        sortRows: whcgMy.my.curry(function (rows, sortParameter, direction) {
            let sortedRows = h.arr.sortArray(rows, sortParameter, direction);
            return sortedRows;
        }),


        deleteRevision: whcgMy.my.curry(function (rev, docId, db) {
            return db.remove(docId, rev);
        }),

        getConflictRows: whcgMy.my.curry(function (docs) {
            return docs['rows'].filter(function (row) {
                return row.doc._conflicts;
            });
        }),


        //gets the previously revision id
        getPreviousRev: whcgMy.my.curry(function (latestDocRev) {
            let previousRev = (latestDocRev._revisions.ids.length - 1) + '-' + latestDocRev._revisions.ids[1];
            let id = latestDocRev._id;
            return db.get(id, {
                rev: previousRev,
                include_docs: true
            });
        }),


        getNewElementIdNumber: whcgMy.my.curry(function (db, elementIdKind) {
            return h.pouch.getAllRowsWithFilter(db, elementIdKind)
                .then((filteredRows) => {
                    let newElementIdNumber;
                    let sortedFilteredRows;
                    let elementIdOfLastDoc;
                    let elementIdNumberOfLastDoc;

                    if (!h.boolean.isEmpty(filteredRows)) {
                        sortedFilteredRows = h.pouch.sortRows(filteredRows, 'id', 'desc');
                        elementIdOfLastDoc = sortedFilteredRows[0].doc.elementId;
                        elementIdNumberOfLastDoc = h.str.getLastWordFromStringUsingSpliter(elementIdOfLastDoc, '-');
                        newElementIdNumber = h.str.convertStringToNumber(elementIdNumberOfLastDoc) + 1;
                    } else {
                        newElementIdNumber = 1;
                    }

                    //console.log("newElementIdNumber", newElementIdNumber);

                    return newElementIdNumber;
                });
        }),

        /**
         * Builds a doc with specified parameters
         * @param db
         * @param parameters an array of parameters
         */
        createDoc: whcgMy.my.curry(function (db, parameters) {
            return new Promise(function (resolve, reject) {
                let serializedNonsensFunction = h.functions.serialize(nonsensFunction);

                let doc = {
                    dbName: db.name,
                    _id: new Date().toISOString(),
                    elementFunction: serializedNonsensFunction,
                    written: new Date().toISOString(),
                };

                parameters.forEach((parameter) => {
                    doc[parameter.key] = parameter.value;
                });

                resolve(doc);
            });
        }),

        createDocs: whcgMy.my.curry(function (db, arr, elementIdKind) {
            return new Promise((resolve, reject) => {
                let docs = [];
                let index = 0;
                let timer = setInterval(function () {
                    if (index < arr.length) {
                        let elementIdNumber = arr[index++];
                        let parameters = [{
                                key: 'elementIdNumber',
                                value: elementIdNumber
                            },
                            {
                                key: 'elementValue',
                                value: ''
                            },
                            {
                                key: 'kind',
                                value: elementIdKind
                            },
                            {
                                key: 'elementId',
                                value: elementIdKind + '-' + elementIdNumber
                            }
                        ];
                        h.pouch.createDoc(db, parameters)
                            .then((doc) => {
                                docs.push(doc);
                            })
                            .catch(() => {
                                clearInterval(timer);
                                reject();
                            });
                    } else {
                        clearInterval(timer);
                        resolve(docs);
                    }
                }, 100);
            });
        }),

        //DONE
        editDoc: whcgMy.my.curry(function (doc, parameters) {
            parameters.forEach((parameter) => {
                doc[parameter.key] = parameter.value;
            });

            doc.written = new Date().toISOString();

            return doc;
        }),

        //DONE
        editDocById: whcgMy.my.curry(function (docId, db, parameters) {
            return h.pouch.getDoc(docId, db)
                .then((doc) => {
                    return h.pouch.editDoc(doc, parameters);
                });
        }),

        //DONE
        editDocAndPut: whcgMy.my.curry(function (doc, db, parameters) {
            let editedDoc = h.pouch.editDoc(doc, parameters);
            return h.pouch.putDoc(editedDoc, db);
        }),

        //DONE
        /**
         * Edits doc id and update the db
         * @param docId
         * @param db
         * @param parameters the attributes array
         */
        editDocByIdAndPut: whcgMy.my.curry(function (docId, db, parameters) {
            return h.pouch.editDocById(docId, db, parameters)
                .then((editedDoc) => {
                    return h.pouch.putDoc(editedDoc, db);
                });
        }),


        /**
         * Get first row were previousH is 'first' and check if empty
         * @param filteredRows array of filtered rows, filtered from kind
         */
        getFirstRowOfSectionOrRow: whcgMy.my.curry(function (filteredRows) {
            return new Promise(function (resolve, reject) {
                row = [];
                row = filteredRows.filter((filteredRow) => {
                    return filteredRow.doc.previousV === 'first';
                });
                if (h.boolean.isEmpty(row)) {
                    resolve(row);
                } else {
                    resolve(row[0]);
                }
            });
        }),

        /**
         * Get first row were previousH is 'first' and check if empty
         * @param filteredRows array of filtered rows, filtered from kind
         */
        getFirstRowOfElement: whcgMy.my.curry(function (filteredRows, parentId) {
            return new Promise(function (resolve, reject) {
                let row = [];
                row = filteredRows.filter((filteredRow) => {
                    return filteredRow.doc.previousH === 'first' && filteredRow.doc.parentId === parentId;
                });
                if (h.boolean.isEmpty(row)) {
                    resolve(row);
                } else {
                    resolve(row[0]);
                }
            });
        }),


        /**
         * Get first row were previousH is 'first' and check if empty
         * @param filteredRows array of filtered rows, filtered from kind
         */
        getLastRowOfKind: whcgMy.my.curry(function (filteredRows) {
            return new Promise(function (resolve, reject) {
                let row = [];
                row = filteredRows.filter((filteredRow) => {
                    return filteredRow.doc.nextH === 'last';
                });
                if (h.boolean.isEmpty(row)) {
                    reject(row[0]);
                } else {
                    resolve(row[0]);
                }
            });
        }),


        setPointersForDocumentAddedFirst: whcgMy.my.curry(function (firstRow) {
            let nextValue;
            let previousValue;
            if (h.boolean.isEmpty(firstRow)) {
                nextValue = 'last';
                previousValue = 'first';
            } else {
                nextValue = firstRow.doc._id;
                previousValue = 'first';
            }

            return {
                'nextKey': nextValue,
                'previousKey': previousValue
            };
        }),


        setPointersForDocumentAddedLast: whcgMy.my.curry(function (lastRow) {
            let nextValue;
            let previousValue;
            if (h.boolean.isEmpty(lastRow)) {
                nextValue = 'last';
                previousValue = 'first';
            } else {
                nextValue = 'last';
                previousValue = lastRow.doc._id;
            }

            return {
                'nextKey': nextValue,
                'previousKey': previousValue
            };
        })
    };



    //Functions
    this.functions = {

        //DONE
        serialize: whcgMy.my.curry(function (newFunction) {
            return JSON.stringify(newFunction, function (key, value) {
                if (typeof value === 'function') {
                    return value.toString();
                }
                return value;
            });
        }),

        //DONE
        deSerialize: whcgMy.my.curry(function (newFunctionString) {
            return JSON.parse(newFunctionString, function (key, value) {

                if (value

                    &&
                    typeof value === 'string'

                    &&
                    value.substr(0, 8) == 'function') {

                    var startBody = value.indexOf('{') + 1;

                    var endBody = value.lastIndexOf('}');

                    var startArgs = value.indexOf('(') + 1;

                    var endArgs = value.indexOf(')');



                    return new Function(value.substring(startArgs, endArgs)

                        , value.substring(startBody, endBody));

                }

                return value;

            });
        })
    };



}).apply(h);







//Set
Set.prototype.isSuperset = function (subset) {
    for (var elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
};

Set.prototype.union = function (setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
};

Set.prototype.intersection = function (setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
};

Set.prototype.difference = function (setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
};




//     //Events
//     this.events = (function(){
//         var topics = {};
//         var hOP = topics.hasOwnProperty;

//         return {
//           subscribe: function(topic, listener) {
//             // Create the topic's object if not yet created
//             if(!hOP.call(topics, topic)) topics[topic] = [];

//             // Add the listener to queue
//             var index = topics[topic].push(listener) -1;

//             // Provide handle back for removal of topic
//             return {
//               remove: function() {
//                 delete topics[topic][index];
//               }
//             };
//           },
//           publish: function(topic, info) {
//             // If the topic doesn't exist, or there's no listeners in queue, just leave
//             if(!hOP.call(topics, topic)) return;

//             // Cycle through topics queue, fire!
//             topics[topic].forEach(function(item) {
//                     item(info != undefined ? info : {});
//             });
//           }
//         };
//     })();


//     //Requests
//     this.requestPostJson = my.curry(function(baseString, requestString, data) {
//         return new Promise((resolve, reject) => {
//             var request = new XMLHttpRequest();
//             request.open('POST', baseString + requestString, true);
//             //console.log(baseString + requestString);
//             //console.log(JSON.stringify(data));
//             request.setRequestHeader('Content-type', 'application/json');
//             request.send(JSON.stringify(data));
//             request.onreadystatechange = function () {
//                 if (request.readyState === 4 && request.status === 200) {
//                     resolve(request.response);
//                 }
//             };
//         });
//     });

// this.requestGetJson = my.curry(function(baseString, requestString) {
//     return new Promise((resolve, reject) => {
//         var request = new XMLHttpRequest();
//         request.open('GET', baseString + requestString);
//         request.responseType = 'application/json';
//         request.send();
//        // console.log('here...');
//         request.onreadystatechange = function () {
//             // console.log(baseString + requestString);
//             // console.log(request.readyState);
//             // console.log(request.status);
//             if (request.readyState === 4 && request.status === 200) {
//                 //console.log(request.response);
//                 resolve(JSON.parse(request.response));

//             }
//             if (request.readyState === 4 && request.status !== 200) {
//                 //console.log(request.response);
//                 //throw 'Uh-oh! rejected message';
//                 reject('meddelande');

//             }
//         };
//     });
// });




// this.indexedDB = {
//     openDb: my.curry(function (db_name, db_version, storeAndIndex) {
//         console.log("openDb ...");

//         var openRequest = indexedDB.open(db_name,db_version);

//         openRequest.onupgradeneeded = function(e) {
//             var thisDB = e.target.result; 
//             console.log("running onupgradeneeded");

//             storeAndIndex.forEach(function(item) {
//                 if(!thisDB.objectStoreNames.contains(item.OS)) {
//                     let itemOS = thisDB.createObjectStore(item.OS, {keyPath: "id"});

//                     item.indices.forEach(function(info) {
//                         itemOS.createIndex(info.index, info.name, {unique:info.unique});
//                     }) 
//                 }

//             });


//         };
//         openRequest.onsuccess = function(e) {
//             console.log("running onsuccess");
//             db = e.target.result;
//             h.events.publish('reloadedPage', '5091');
//         };

//         openRequest.onerror = function(e) {
//             console.log("onerror!");
//             console.dir(e);
//         };
//     }),
//     getObjectStore: my.curry(function (store_name, mode) {
//         var tx = db.transaction(store_name, mode);
//         return tx.objectStore(store_name);
//     }),
//     getAllInStore: my.curry(function (store_name) {
//         return new Promise((resolve, reject) => {
//             let store = h.indexedDB.getObjectStore(store_name, 'readonly');
//             let request;
//             let arr = [];

//             request = store.openCursor();
//             request.onsuccess = function(event) {
//                 let cursor = event.target.result;

//                 if (cursor) {
//                     log(cursor.value);
//                     arr.push(cursor.value);
//                     cursor.continue();

//                 } else {
//                     console.log("No more entries");
//                     if(arr.length != 0) {
//                         resolve(arr);
//                     } else {
//                         reject();
//                     };

//                 }
//             };

//             request.onerror = function(event) {
//                 reject();
//             };

//         });      

//     }),
//     getOneFromIndexInStore: my.curry(function (store_name, index_name, index_value) {
//         return new Promise((resolve, reject) => {

//             let store = h.indexedDB.getObjectStore(store_name, 'readonly');
//             let index = store.index(index_name);
//             let request;

//             request = index.get(index_value);
//             request.onsuccess = function(event) {
//                 log(event.target.result);
//                 resolve(event.target.result);
//             };
//         });
//     }),
//     getAllFromIndexInStore: my.curry(function (store_name, index_name, index_value) {
//         return new Promise((resolve, reject) => {
//             console.log('store_name: ', store_name);
//             console.log('index_name: ', index_name);
//             console.log('index_value: ', index_value);
//             let singleKeyRange = IDBKeyRange.only(index_value);
//             let store = h.indexedDB.getObjectStore(store_name, 'readonly');
//             let index = store.index(index_name);
//             let request;
//             let arr = [];

//             request = index.openCursor(singleKeyRange);
//             request.onsuccess = function(event) {
//                 let cursor = event.target.result;

//                 if (cursor) {
//                     log(cursor.value);
//                     arr.push(cursor.value);
//                     console.log('cursor: ', arr);
//                     cursor.continue();
//                 } else {
//                     console.log("No more entries", index_name);
//                     console.log(arr);
//                     if (arr.length) {
//                         console.log('arr.length');
//                         resolve(arr);
//                     } else {
//                         console.log('arr.length == 0');
//                         reject(); 
//                     }

//                 }
//             };

//             request.onerror = function(event) {
//                 console.log('An error!');
//                 reject();
//             };
//         });
//     }),
//     deleteOneFromKeyInStore: my.curry(function (store_name, key) {


//         let store = h.indexedDB.getObjectStore(store_name, 'readwrite');
//         let request = store.delete(key);

//         request.onsuccess = function(e) {
//             log('deleted one');
//             console.dir(e);
//         }

//         request.onerror = function(e) {
//             console.log("Error");
//             console.dir(e);
//         }
//     }),
//     addObjectToStore: my.curry(function (store_name, obj) {
//         //console.log("addPublication arguments:", obj);

//         var store = h.indexedDB.getObjectStore(store_name, 'readwrite');
//         var req;
//         try {
//           req = store.add(obj);
//         } catch (e) {
//           if (e.name == 'DataCloneError') {
//             console.log(e.name);
//           }

//           throw e;
//         }
//         req.onsuccess = function (event) {
//           console.log("Insertion in DB successful");
//         };
//         req.onerror = function() {
//           //console.error("addPublication error", this.error);
//         };
//     }),
//     getOneFromKeyInStore: my.curry(function (store_name, key) {


//             let store = h.indexedDB.getObjectStore(store_name, 'readonly');
//             let request = store.get(key);

//             request.onsuccess = function(e) {
//                 log('get one');
//                 var result = e.target.result;
//                 console.dir(result);
//             }

//             request.onerror = function(e) {
//                 console.log("Error");
//                 console.dir(e);
//             }
//         })
// };

/**
 * Constructs array with element info from database array
 */
// constructElementInfoFromDb: my.curry(function(rows) {

//     let elementInfos = rows.map((item) => {

//         let elementInfo = new h.dom.ElementInfoConstructor();
//         elementInfo.kind = "input";
//         elementInfo.attribute.push({
//             key: "dbName",
//             value: item.doc.dbName

//         });
//         elementInfo.attribute.push({
//             key: "placeholder",
//             value: item.doc.country

//         });
//         elementInfo.attribute.push({
//             key: "written",
//             value: item.doc.written

//         });
//         elementInfo.attribute.push({
//             key: "_id",
//             value: item.doc._id

//         });
//         elementInfo.attribute.push({
//             key: "_rev",
//             value: item.doc._rev

//         });

//         return elementInfo;
//     });

//     return elementInfos;

// }),

// /**
//  * 
//  * @param event
//  * @param db
//  */
// addOneDocLastWithFilterOLD: my.curry(function (event, db) {

//     let kind = event.target.attributes.kind.value;

//     if(kind === 'section') {
//         let element = h.dom.getElement('id', 'inputSectionName');
//         let sectionName = h.dom.getAttribute('value', element);
//         kind = sectionName + '-section';
//     }

//     let lastWordOfKind = h.str.getLastWordFromStringUsingSpliter(kind, '-');
//     let allButLastWordOfKind = h.str.removeLastWordFromStringUsingSplitter(kind, '-'); 

//     let nextKey;
//     let previousKey;

//     if(lastWordOfKind === 'section' || lastWordOfKind === 'row') {
//         nextKey = 'nextV';
//         previousKey = 'previousV';
//     } else {
//         nextKey = 'nextH';
//         previousKey = 'previousH';
//     }

//     return h.pouch.getAllRowsWithFilter(db, kind)

//     //search for the last row
//     .then((filteredRows) => {

//         lastRow = [];
//         lastRow = filteredRows.filter((filteredRow) => {
//             return filteredRow.doc[nextKey] === 'last'; 
//         });

//         return(lastRow); 
//     })
//     //defines previous id form db
//     .then((lastRow) => {

//         let previousValue;
//         if(h.boolean.isEmpty(lastRow)) {
//             previousValue = 'first';
//         } else {
//             previousValue = lastRow[0].doc._id;
//         }

//         //gets last element id number from DOM
//         return h.pouch.getNewElementIdNumber(db, kind) //may bee new name newLastElementIdNumber??
//         .then((newElementIdNumber) => {
//             console.log("qqqqq");

//             //creates new document attributes in db
//             let attributes = [
//                 {
//                     key: 'elementIdNumber',
//                     value: newElementIdNumber
//                 },
//                 {
//                     key: 'elementValue',
//                     value: ""
//                 },
//                 {
//                     key: previousKey,
//                     value: previousValue
//                 },
//                 {
//                     key: nextKey,
//                     value: 'last'
//                 },
//                 {
//                     key: 'kind',
//                     value: kind
//                 },
//                 {
//                     key: 'elementId',
//                     value: kind + "-" + newElementIdNumber
//                 }
//             ];
//             //creates new doc to be posted in db
//             return h.pouch.createDoc(db, attributes);
//         })
//         //post new doc to db
//         .then((doc) => {
//             return h.pouch.postDoc(doc, db);
//         })
//         //if not empty let previous doc's 'next' attribute be the new 'last' doc's id
//         .then((response) => {
//             if(!h.boolean.isEmpty(lastRow)) {
//                 return h.pouch.editDocByIdAndPut(previousValue, db, [{
//                     key: nextKey,
//                     value: response.id
//                 }]);
//             } else {
//                 return response;
//             }
//         })
//         //gets last row from db
//         .then(() => {
//             return h.pouch.getLatestRowWithFilter(db, kind);//DOES IT NEED TO BE FILTERED?
//         })
//         //creates a new element and places it as child to parent in DOM
//         .then((row) => {

//             console.log('KIIIIND');
//             console.log(kind);

//             if(lastWordOfKind === 'section') {
//                 let sectionName = h.str.removeLastWordFromStringUsingSplitter(kind, '-');
//                 return views.parmaco.createSection(sectionName, db, 'last', row.doc);
//             }   
//             else if (lastWordOfKind === 'row') {
//                 return h.pouch.getNewElementIdNumber(db, kind)
//                     .then((newElementIdNumber) => {
//                         return views.parmaco.createRow(allButLastWordOfKind, newElementIdNumber, db, 'last', row.doc);
//                     });
//             }

//             else {
//                 return h.pouch.getNewElementIdNumber(db, kind)
//                     .then((newElementIdNumber) => {
//                         return views.parmaco.createElementOfKindLast(kind + 's-box', kind, db, row);
//                     });
//             }
//         }); 
//     });        
// }),

// WORKING___deleteFirstDocWithFilter: my.curry(function (kind, parentIdValue, db) { //CHANGE FUNCTION NAME!

//     console.log('HEJAA!!!');
//     console.log(kind);
//     console.log(parentIdValue);
//     let lastWordOfKind = h.str.getLastWordFromStringUsingSpliter(kind, '-');
//     console.log(lastWordOfKind);
//     let idOfDocNext;
//     let previous;
//     let idOfDocToRemove;
//     let children;

//     function reqfunc (i, childId) {
//         console.log('idOfDocToRemove'); 
//         console.log(idOfDocToRemove); 
//         console.log('kind');
//         console.log(kind);      
//         return h.event.deleteFirstDocWithFilter(kind + '-element', idOfDocToRemove, db)
//             .then(() => {
//                 i = i + 1;
//                 if (i < children.length) {
//                     console.log('childrenLength');
//                     console.log(children.length);
//                     console.log('i');
//                     console.log(i);
//                     return reqfunc(i, children[i].doc._id);
//                 } else {
//                     return h.event.deleteFirstDocWithFilter(kind, parentIdValue, db);
//                 }    
//             }); 
//     }


//     return h.pouch.getAllRowsWithFilter(db, kind)
//         .then((filteredRows) => {
//             console.log('filteredRows!!!!!!!!!');
//             console.log(filteredRows);
//             console.log(filteredRows);

//             if (lastWordOfKind === 'row') {
//                 console.log('IM IN');
//                 return h.pouch.getFirstRowOfSectionOrRow(filteredRows)
//                     .then((firstRow) => {

//                         console.log('firstRow');
//                         console.log(firstRow);

//                         idOfDocToRemove = firstRow.doc._id;

//                         return h.pouch.getAllRowsWithFilter(db, kind + '-element')
//                             .then((filteredElementRows) => {
//                                 children = filteredElementRows.filter((filteredElementRow) => {
//                                     return filteredElementRow.doc.parentId === idOfDocToRemove;
//                                 });

//                                 console.log('children');
//                                 console.log(children);
//                             });  
//                     });
//             }

//             else {
//                 return true;
//             }


//         })
//         .then(() => {
//             if ((lastWordOfKind === 'row') && (h.boolean.isEmpty(children) === false)) {
//                 return reqfunc(0, children[0].doc._id);
//             } else {
//                 return h.pouch.getAllRowsWithFilter(db, kind)
//                     .then((filteredRows) => {
//                         console.log('filteredRows!!!!');
//                         console.log(filteredRows);

//                         if (lastWordOfKind === 'element') {
//                             return h.pouch.getFirstRowOfElement(filteredRows, parentIdValue);
//                         } else {
//                             return h.pouch.getFirstRowOfSectionOrRow(filteredRows); 
//                         }   
//                     })
//                     .then((firstRow) => {
//                         console.log('firstRow2');
//                         console.log(firstRow);

//                         if (lastWordOfKind === 'element') {
//                             idOfDocNext = firstRow.doc.nextH;
//                             previous = 'previousH';
//                         } else {
//                             idOfDocNext = firstRow.doc.nextV;
//                             previous = 'previousV';
//                         }  


//                         idOfDocToRemove = firstRow.doc._id;

//                         console.log('idOfDocNext');
//                         console.log(idOfDocNext);
//                         if (idOfDocNext !== 'last') {
//                             let parameters = [
//                                 {
//                                     key: previous,
//                                     value: 'first'
//                                 }
//                             ];
//                             return h.pouch.editDocByIdAndPut(idOfDocNext, db, parameters)
//                                 .then(() => {
//                                     return h.pouch.deleteDocById(idOfDocToRemove, db); 
//                                 });
//                         } else {
//                             return h.pouch.deleteDocById(idOfDocToRemove, db);
//                         }

//                     })
//                     .then((response) => {
//                         console.log('HEJ');
//                         console.log(response);
//                         console.log(lastWordOfKind);
//                         removeFromController(response, db, lastWordOfKind, 'first');

//                         response.id = idOfDocNext;
//                         console.log('test if id nest is last');
//                         console.log(response.id);

//                         if (response.id !== 'last') {
//                             return updatePosition(response, db);
//                         }

//                         return true;

//                     })
//                     .then(() => {
//                         console.log('one');
//                         return h.pouch.getAllRowsWithFilter(db, kind);
//                     })
//                     .then((filteredRows) => {
//                         console.log('two');
//                         console.log(filteredRows);
//                         console.log('kind');
//                         console.log(kind);
//                         console.log('parentIdValue');
//                         console.log(parentIdValue);
//                         if (h.str.getLastWordFromStringUsingSpliter(kind, '-') === 'row') {
//                             return removeRowFromDom(filteredRows, kind, parentIdValue); 
//                         } else if (h.str.getLastWordFromStringUsingSpliter(kind, '-') === 'section') {
//                             return removeSectionFromDom(filteredRows, kind); 
//                         } else {
//                             return removeElementFromDom(filteredRows, kind, parentIdValue); 
//                         }

//                     })
//                     .catch((obj) => {
//                         console.log('rejected!!');   
//                     });
//             }
//         });            
// }),

exports.h = h;
