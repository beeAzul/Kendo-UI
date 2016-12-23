//var dataFiltered;
// $.each( grid.dataSource.data(), function( key, value) {
//     console.log("clé :" + value.type.id + " " + "valeur :" + value.type.typeName)
//     if(value.type.id == dataTreeview.id)
//     {
//         dataFiltered += value;
//     }
//     // if(selected == value.typeName) {
//     //     grid.dataSource.get("type")
//     // }
// });



//var toto = grid.dataSource.get(1);

//grid.dataSource.filter({
//    field: "type", 
//    operator: function (field, value) {
//        //return field && field.find( function (item) {
//        return field.typeName === value;
//        //})
//    }, 
//    value: this.text(e.node)
//});

//console.log(e.node.innerText);
////console.log(grid.dataSource.field);    
//}



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

// dataTypes = new kendo.data.HierarchicalDataSource({
//     data: types,
//     schema: {
//         model:  [{   all: "All", 
//                     items: [
//                         {
//                             id: "id",
//                             typeName: "typeName"
//                         }
//                     ]
//                 }]
//     }
// });

// var dataTypes = new kendo.data.DataSource({
//     data: type,
//     schema: {
//         type: 'json',
//         model: {
//             // configure the fields of the object
//             fields: {
//                 all: { type:"string" },
//                 items: 
//                     { 
//                         id:           {type:"number"} , 
//                         typeName :    {type:"string"} 
//                     }   
//             }
//         }
//     }

// $("#treeview").kendoTreeView({
//     dataSource: types,
//     checkboxes: {
//         checkChildren: true
//     },
//     select: onSelect,
//     check: onCheck,
//     change: onChange,
//     collapse: onCollapse
// });

// $(":checkbox").filter( function() {
//     var text = $(this).parent().next().text();
//     return text != "bar" && text != "foo";
// }).prop("checked", true);

// var treeview = $("#treeview").data("kendoTreeView");
// treeview.updateIndeterminate();