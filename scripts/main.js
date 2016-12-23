$(document).ready( function() {
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
                items: [{text: "Sub Item 1"},{text: "Sub Item 2"},{text: "Sub Item 2"},{text: "Sub Item 2"}]        //Add sub menu
            },
        ]
    });


    /**
     * Splitter : Main
     */
    $('#main').kendoSplitter({
        panes: [ { size: "10%", resizable: true }, //   
                 { size: "90%", resizable: true } 
        ]
    });


    /**
     * kendoGrid : Table
     */

        //Creation of the dataSource for the kendoGrid
        var dataCars = new kendo.data.DataSource({
                pageSize: 20,
                data: cars,
                schema: {
                    model: {
                        id: "index",
                        fields: {
                            index: { editable: false, nullable: true },
                            Constructeur: { type: "string", editable: false, nullable: true },
                            Modele: { type:"string", editable: true, nullable: true },
                            type:
                                {
                                    id: { type: "number", defaultValue: 1 },
                                    typeName: { type: "string", defaultValue: "Berline" }
                                }
                            ,
                            carburant: { type:"string", editable: true, nullable: true },
                            date: { type:"string", editable: true, nullable: true },
                            prix: { type: "number", validation: { required: true, min: 0 } },
                            picture: { type: "string", validation: { required: true} },
                        }
                    }
                }
        });

        $("#grid").kendoGrid({
                autoBind: false,
                //dataSource: dataCars,
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
        });

        /**
         * Create a DropDown.
         * It will be created in every "type" field.
         *
         * @param container {string} HTML element which will contain the DropDown.
         * @param options {string} name attribute of the targeted element.
         *
         * @return void.
         */
        function categoryDropDownEditor(container, options) {
            $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                    autoBind: true,
                    dataTextField: "typeName",
                    dataValueField: "id",
                    dataSource: { 
                        data: typed
                    }
            });
    }


    /**
     * Treeview
     */
            // Test with other data
            var hierarchical = new kendo.data.HierarchicalDataSource({
                data: herarchicalData,
                schema: {
                    model: {
                        children: "items",
                    }
                }
            });


    window.typeData = new kendo.data.HierarchicalDataSource({
        data: type,
        schema: {
            model: {
                children: "items",
            }
        }
    });


    $("#treeview").kendoTreeView({
        dataSource: typeData,
        loadOnDemand:true,
        dataTextField: ["text", "typeName", "Constructeur"],
        select: onSelect,
        change: onChange
    });

    /**
     * Test Treeview
     */
    //animation
    $("#treeview-test").kendoTreeView({
        //animation: false,
        // animation: {
        //     collapse: false
        // },
        // animation: {
        //     collapse: {
        //     duration: 400
        //     }
        // },
        // animation: {
        //     collapse: {
        //     effects: "fadeOut collapseVertical"
        //     }
        // },
        // animation: {
        //     expand: true
        // },
        // animation: {
        //     expand: {
        //     duration: 600
        //     }
        // },
        // animation: {
        //     expand: {
        //         effects: "fadeIn expandVertical"
        //     }
        // },
        // // autoBind: true,
        autoScroll: true,
        dragAndDrop: true,
        // checkboxes: {
        //     checkChildren: true,
        //     name: "inputName",
        //     template: "<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />",
        // },
        // dataUrlField: "ling",
        dataImageUrlField: "image",
        messages: {
            loading: "Laden..."
        },
        dataSource: hierarchical,
        dataTextField: [ "text" ]
    });

      
    function filterGrid(grid, bool, field= null, value= null ) {
        if(bool){
            grid.dataSource.filter({
                field: field,
                operator: function (field, value) {
                    return field.id === value;
                },
                value: value
            });
        }
        else 
        {
            grid.dataSource.filter({});
        }
    }

    function filterDataSource(dataSource, bool, field= null, value= null ) {
        if(bool){
            dataSource.filter({
                field: field,
                operator: function (field, value) {
                    return field.id === value;
                },
                value: value
            });
        }
        else 
        {
            dataSource.filter({});
        }
    }

    // var grid = $("#grid").data("kendoGrid");

    // filterGrid(grid,false);

    function onSelect(e) {

        console.log(dataCars);

        if(e.node.children.length > 1 && this.text(e.node) != "Types")
        {
            e.node.removeChild(e.node.lastChild);
        }

        console.log("Selecting: " + this.text(e.node));

        var grid = $("#grid").data("kendoGrid");

        var treeview =  $("#treeview").data("kendoTreeView");

        var dataTreeview = treeview.dataItem(e.node);   // get data object from the node element

        // var selected = this.text(e.node);

        // var current;

        if(this.text(e.node) == "Types")
        {
            filterGrid(grid,false);     // Reset filter on clicking on "Types"
        }
        else
        {
            // filterGrid(grid,true, "type", this.text(e.node));   // Filter dataSource Grid with the typeName retrieved in the Treeview
            // filterGrid(grid,true, "type", dataTreeview.id); //


            var dataSource = filterDataSource(dataCars, true, "type", dataTreeview.id);

            // var gdv = grid.dataSource.view();   //List of Current dataSource Filtered object

            var tf = treeview.findByText(dataTreeview.typeName);    // All nodes that have the text

            treeview.append(dataSource, tf); // Add list of object filtered in the treeview

            grid.setDataSource = dataSource;
       
        }

    }

    function onChange(e) {
        console.log("Selection changed ");

        // var grid = $("#grid").data("kendoGrid");

        // var treeview =  $("#treeview").data("kendoTreeView");
        
        // filterGrid(grid,false);
    }

    function onCheck(e) {
        console.log("Selection changed");
    }

    function onUnCheck(e) {
        console.log("Selection changed");
    }


    function onCollapse(e) {
        console.log("Collapsing " + this.text(e.node));
    }


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