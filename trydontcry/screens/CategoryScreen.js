import { FlatList , View, Text} from "react-native";
// import { CATEGORIES } from '../data/dummydata';
import CategoryGridTile from '../componenets/CategoryGridTile';
import useCategories  from '../utilis/useCategoriesRQ';
import {gql,useQuery} from '@apollo/client';


const TRACKS = gql`
 query ExampleQuery {
   tracksForHome {
     id
     title
  }
}
`;

function CategoryScreen({ navigation}){    
  const {loading, error, data } = useQuery(TRACKS); 

  if(loading) return <Text>"Loading..."</Text>;

  if(error) return <Text>"An error has occurred: " + {error.message} </Text>;
   
  //console.log('catQu',catQu);
  let arr; 
  if(data){
    arr = data.tracksForHome;
    //console.log(data);
  };
 
  
    function ItemCategoryRender(dataItem){
        function pressHandler (){
             navigation.navigate('All Topics of Category', {
               
                catID : dataItem.item.id,
                catName : dataItem.item.title,
                catSlug : dataItem.item.title, 
             })
            //  console.log("dataItem.item",dataItem.item)
         };
        return(<CategoryGridTile 
                    name={dataItem.item.title} 
                    color={dataItem.item.id}
                    onPress={pressHandler}
                    />
                    );      
    }
    
    return <FlatList
                //data={CATEGORIES}
                data={arr}
                keyExtractor={(item) => item.id}
                renderItem={ItemCategoryRender}
                numColumns={2}                
     />;
    
};

export default CategoryScreen; 