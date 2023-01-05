// import React from "react";
// import ReactDOM from "react-dom";

// import {
//     ReactiveBase,
//     DataSearch,
//     ReactiveList,
//     ResultCard,
//     SelectedFilters
// } from "@appbaseio/reactivesearch";

// import "./coba.css";

// const Coba = () => (
//     <ReactiveBase
//         enableAppbase
//         app="default"
//         // url="https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch"
//         url="https://data.mongodb-api.com/app/data-mowdy/endpoint/data/v1"
//         mongodb={{
//             db: "levint-app",
//             collection: "items"
//         }}
//     >
//         <div>
//             <div>
//                 <DataSearch
//                     title="Search UI powered by Atlas Search 🚀"
//                     dataField={[
//                         {
//                             field: "name",
//                             weight: 3
//                         }
//                     ]}
//                     componentId="search-component"
//                     URLParams
//                     size={5}
//                 />
//             </div>
//             <div>
//                 <SelectedFilters />
//                 <ReactiveList
//                     componentId="SearchResult"
//                     dataField="property_type"
//                     size={10}
//                     className="result-list-container"
//                     pagination
//                     react={{
//                         and: "search-component"
//                     }}
//                     render={({ data }) => (
//                         <ReactiveList.ResultCardsWrapper>
//                             {data.map((item) => (
//                                 <ResultCard id={item._id} key={item._id}>
//                                     <ResultCard.Image src={item.gambar[0].url} />
//                                     <ResultCard.Title>
//                                         <div
//                                             className="title"
//                                             dangerouslySetInnerHTML={{
//                                                 __html: item.nama_item
//                                             }}
//                                         />
//                                     </ResultCard.Title>

//                                     <ResultCard.Description>
//                                         <div className="flex column justify-space-between">
//                                             <div title={item.deskripsi_item} className="description">
//                                                 ({item.deskripsi_item} )
//                                             </div>
//                                             <div className="tag">
//                                                 Accomodates <span>{item.jumlah_item}</span>
//                                             </div>
//                                         </div>
//                                     </ResultCard.Description>
//                                 </ResultCard>
//                             ))}
//                         </ReactiveList.ResultCardsWrapper>
//                     )}
//                 />
//             </div>
//         </div>
//     </ReactiveBase>
// );

// export default Coba;
