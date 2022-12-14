import {View, Text, StyleSheet, FlatList} from 'react-native';
import SubCategoryList from '../componenets/SubCategoryList';
import  SUBCATEGORIES  from '../data/dummydata';
import { gql, useQuery } from '@apollo/client';

const MODS = gql`
query ExampleQuery($trackId: ID!) {
  track(id: $trackId) {
    id
    title
    mod {
      id
      title
    }
    
  }
}
`;

function SubCategoryScreen ({route, navigation}){
  
  const {catID, catName, catSlug} = route.params;  
  console.log('route.params.catId',catID); 

  const {loading, error, data } = useQuery(MODS ,{ variables : {trackId : catID}  })

  let arrOfTopics;  
  if(data) {
    arrOfTopics = data.track.mod;
    console.log('data',data.track.mod)
  }
  

  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>"An error has occurred: " + {error.message} </Text>;
 

    
    
    
   

     const renderSubItem = (dataItem) => {
      const item = dataItem.item; 
      
      const  subcategoryProps = {
        id:item.id,  //topicId which needed for 
        name: item.title,
        // ImageURI: item.image,
        // replies: item.posts_count -1 ,
        // views: item.views
      };

      return( <SubCategoryList  
                   { ...subcategoryProps} 
                    /> )
     };

    return(
        <View> 
            <Text>
              This {catName}, it's ID is {catID}
            </Text>
           
            <FlatList
               data={arrOfTopics}
               keyExtractor={(item) => item.id}
               renderItem={renderSubItem}
               
            />
           
           
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:16
    }
})

export default SubCategoryScreen;