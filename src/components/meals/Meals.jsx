import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchApi } from '../../lib/fetchApi';
import MealItem from './meal-item/MealItem';

// const DUMMY_MEALS = [
//     {
//         id: 1,
//         title: "Sushi",
//         description: 'finest fish and veggirs',
//         price:  22.99
//     },
//     {
//         id:2,
//         title: "Pizza",
//         description: 'finest fish and veggirs',
//         price:  16.0
//     },
//     {
//         id: 3,
//         title: "Barbecue",
//         description: 'finest fish and veggirs',
//         price:  12.99
//     },
//     {
//         id: 4,
//         title: "Green Bowl",
//         description: 'finest fish and veggirs',
//         price:  19.99
//     }
// ]

const Meals = () => {

    const [meals,setMeals] = useState([])
    const [error,setError] = useState('')
    const [isLoading,setLoading] = useState(false)
 
    const getMeals = async() =>{
        try{
            setLoading(true)
       const response =  await fetchApi('foods')
       console.log(response.data);

       setMeals(response.data)
       
        }catch(error){
            console.log(error);
            setError("failed to Load meals")
        }
        setLoading(false)
    }

    useEffect(() =>{   
        getMeals()  
    },[])

    return (
        <Card >
            {isLoading && !error && <p>LOADING........</p>}
            {error &&  <p style={{color: 'red'}}>{error}</p>}
            {meals.map((meal,index) => {
                return <MealItem key={index}  meal={meal}/>
            })}
            </Card>
       
    );
};

export default memo(Meals);

const Card = styled.div`
background: #FFFFFF;
border-radius: 16px;
width: 75%;
margin: 40px auto;
padding: 40px;
`