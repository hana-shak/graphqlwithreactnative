const resolvers = {
   Query : {
    tracksForHome:(_, __, { dataSources })=>{
        return dataSources.catApi.getTracksForHome();
    },
    track:(_,{id},{dataSources}) => {
        return dataSources.catApi.getTrack(id);    
     }
   },
   Track:{
     author:({authorId},_,{dataSources})=>{
        return dataSources.catApi.getAuthorId(authorId);
     },
     mod:({id},_,{dataSources})=>{
      return dataSources.catApi.getTrackMod(id);
   }
   }
   

   
}

module.exports = resolvers;