const BASE_URL = "http://3.35.210.170:8080/api";

const HTTP_METHOD = {
    POST(data){
        return {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    },
    PUT(data){
        return {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify({name: data}) : null
        }
    },
    DELETE(){
        return {
            method:'DELETE',
        }
    }
}

const request = async (url , option) => {
    const response = await fetch( url , option );
    if(!response.ok){
        console.error('에러 발생');
    }
    return response.json();
}


const requestWithOutJson = async (url , option) => {
    const response = await fetch( url , option );
    if(!response.ok){
        console.error('에러 발생');
    }
    return response;
}



const ListApi = {
    getAllListByListItem(){
        return request(`${BASE_URL}/mainList`);
    },

    creatList(detail){
        return request(`${BASE_URL}/insMainList`,
        HTTP_METHOD.POST(
        {   
            title: detail ,
            checkYn : 'N' , 
            delYn : 'N'
        }
        ));
    },

    async modifieListdName(listItem , modifiedmenuName , menuId){
        return request(
            `${BASE_URL}/setMainList/${listItem}${menuId}`,
            HTTP_METHOD.PUT(modifiedmenuName));
    },

    async deleteListName(listItem , menuId){
        return requestWithOutJson(
            `${BASE_URL}/setTrashCan/${menuId}`,
            HTTP_METHOD.PUT());
    },

    async toggleCompleteList(listItem , menuId){
        return request(
            `${BASE_URL}/listItem/${listItem}/menu/${menuId}/soldOut`,
            HTTP_METHOD.PUT());
    }
}










export default ListApi;