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
    getAllListByListItem(listItem){
        return request(`${BASE_URL}/listItem/${listItem}/list`);
    },

    creatList(listItem , menuName){
        return request(
            `${BASE_URL}/listItem/${listItem}/list`,
            HTTP_METHOD.POST({name: menuName}));
    },

    async modifieListdName(listItem , modifiedmenuName , menuId){
        return request(
            `${BASE_URL}/listItem/${listItem}/list/${menuId}`,
            HTTP_METHOD.PUT(modifiedmenuName));
    },

    async deleteListName(listItem , menuId){
        return requestWithOutJson(
            `${BASE_URL}/listItem/${listItem}/list/${menuId}`,
            HTTP_METHOD.DELETE());
    },

    async toggleSoldOutList(listItem , menuId){
        return request(
            `${BASE_URL}/listItem/${listItem}/list/${menuId}/soldOut`,
            HTTP_METHOD.PUT());
    }
}





export default ListApi;