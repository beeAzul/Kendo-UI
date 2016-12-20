$(document).ready( function() {
    /**
     * DataSource
     */

    // $.getJSON('../data.json').success(function(data) {
    //                 var json = JSON.parse(data)
    //                 console.log(json);
    //             });

    //     var jsonData = new kendo.data.DataSource({
    //         transport: {
    //             read: {
    //                 url: "http://localhot:58884/data.json",
    //                 type: "get",
    //                 dataType: "json"
    //             }
    //         },
    //         schema: {
    //                 data: "data"
    //         }
    //     });


    /**
     * Splitter : Header
     */
    $('#header').kendoSplitter({
        orientation: "vertical",
        panes: [ 
            { size: "90%", resizable: false },
            { size: "10%",}
        ]
    });


    /**
     * Menu
     */
    $("#menu").kendoMenu({
        dataSource:[
            {
                text: 'Menu 1',
                cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                url: "http://www.kendoui.com",               // Link URL if navigation is needed, optional.
                attr: {
                    custom: 'value',                         // Add attributes with specified values
                    other: 'value'
                },
                items: [{text: "Sub Item 1"},{text: "Sub Item 2"},{text: "Sub Item 2"},{text: "Sub Item 2"}]
            },
            {
                text: 'menu 2',
                cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                url: "http://www.kendoui.com",               // Link URL if navigation is needed, optional.
                attr: {
                    custom: 'value',                         // Add attributes with specified values
                    other: 'value'
                },
                items: [{text: "Sub Item 1"},{text: "Sub Item 2"},{text: "Sub Item 2"},{text: "Sub Item 2"}]
            },
            {
                text: 'menu 3',
                cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                url: "http://www.kendoui.com",               // Link URL if navigation is needed, optional.
                attr: {
                    custom: 'value',                         // Add attributes with specified values
                    other: 'value'
                },
                items: [{text: "Sub Item 1"},{text: "Sub Item 2"},{text: "Sub Item 2"},{text: "Sub Item 2"}]
            },
        ]
    });


    /**
     * Splitter : Main
     */
    $('#main').kendoSplitter({
        panes: [ { size: "10%", resizable: true },
                 { size: "90%", resizable: true } 
        ]
    });


    /**
     * kendoGrid : Table
     */
    var dataCars = new kendo.data.DataSource({
        pageSize: 20,
        data: cars,
        autoSync: true,
        schema: {
            model: {
                id: "index",
                fields: {
                    index: { editable: false, nullable: true },
                    Constructeur: { type: "string", editable: true, nullable: true },
                    Modele: { type:"string", editable: true, nullable: true },
                    type: { type:"string", defaultValue: { "id": 1, typeName: "Berline"} },
                    carburant: { type:"string", editable: true, nullable: true },
                    date: { type:"string", editable: true, nullable: true },
                    prix: { type: "number", validation: { required: true, min: 0 } },
                    picture: { type: "string", validation: { required: true} },
                }
            }
        }
    });

    $("#grid").kendoGrid({
            dataSource: dataCars,
            filterable: true,
            sortable: true,
            columns: [
                { field: "index" },
                { field: "Constructeur" },
                { field: "Modele" },
                { field: "type", editor: categoryDropDownEditor, template: "#=type.typeName#" },
                { field: "carburant" },
                { field: "date" },
                { field: "prix", format: "{0:c}" },
                { field: "picture" }
            ],
            editable: true,
            dataSource: cars
        });

    function categoryDropDownEditor(container, options) {
        $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                autoBind: false,
                dataTextField: "typeName",
                dataValueField: "id",
                dataSource: { 
                    data: types
                }
        });
    }

    dataTypes = new kendo.data.HierarchicalDataSource({
        data: types
        ,
        schema: {
            model: {
                id: "id",
                typeName: "typeName"
            }
        }
    });

    $("#treeview").kendoTreeView({
        dataSource: dataTypes,
        checkboxes: true,
        select: onSelect,
        check: onCheck,
        change: onChange,
        collapse: onCollapse,
        dataValueField: "id",
        dataTextField: "typeName"
    });

    function onSelect(e) { 
        console.log("Selecting: " + this.text(e.node));
    }

    function onCheck(e) {
        console.log("Checkbox changed :: " + this.text(e.node));
    }

    function onChange(e) {
        console.log("Selection changed");
    }

    function onCollapse(e) {
        console.log("Collapsing " + this.text(e.node));
    }

    // grid.dataSource.originalFilter = grid.dataSource.sort;
    // console.log(grid.dataSource.originalFilter);

    var grid = $("#grid").data("kendoGrid");
    console.log(grid);
    grid.sort('DSC');


    /**
     * Data Form
     */
    var dataForm = kendo.observable({
        culture: "fr-FR",
        dataGrid: [],
        first: null,
        last: null,
        sexe: null,
        birth: null,//kendo.toString(new Date(),"d"),
        displayBirth: function() {
            var birth = this.get("birth");
            return kendo.toString(birth,"d");
        },
        countries: [
            { name: "France", value: "france" },
            { name: "Portugal", value: "portugal" },
            { name: "Italie", value: "italie" }
        ],
        selectedCountry: "France",
        displayCountry: function() {
            var country = this.get("selectedCountry");
            return kendo.stringify(country);
        },
        pushDataToGrid: function() {
                            this.get("dataGrid").push({
                                                    Prénom: this.get("first"),
                                                    Nom: this.get("last"),
                                                    Sexe: this.get("sexe"),
                                                    Date: this.get("birth"),
                                                    Pays: this.get("selectedCountry")
                                                });

                            // reset form fields 

                            this.set("first","");
                            this.set("last","");
                            this.set("sexe","");
                            this.set("birth","");
                            this.set("selectedCountry","France");
                        },
    });

    dataForm.bind("change", function (e) {

        if (e.field == "birth") {
            dataForm.set("birth", kendo.toString(e.sender[e.field], "d"));
        }

        console.log(e.field); // will output the field name when the event is raised
    });

    var json = dataForm.toJSON();

    kendo.bind(document.body.children, dataForm);

});