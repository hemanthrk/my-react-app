"use client";
import { useState, useRef, useEffect, useActionState, startTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import footballers from "./footballers";
import {useDebounce} from "./hooks/useDebounce";
import { submitForm } from './actions/submitForm';
import { getUsers } from './actions/getUsers';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  //console.log("before use effect");
useEffect(() =>{
  document.title = `The current count is ${count}`;
  console.log("component renders, useEffect");
},[count]);

  const [user,setUser] = useState({name:"john Doe", age:31, city:"LA"});
  const [items, setItems] = useState([{id:0, name:"Item 1"}, {id:1, name:"Item 2"}, {id:2, name:"Item 3"}]);
  const [color, setColor] = useState("#FFFFFF");
  const inputRef = useRef(null);


    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query,1000);
    const[resultQ, setResultQ]  = useState("");
  const [fQuery, setFQuery] = useState("");
  const [fResults, setFResults] = useState([]);
  const [otp, setOtp] = useState();
  const [counter5, setCounter5] = useState(5); 
  const [state, submit,isPending] = useActionState(submitForm, {message:""});
  const [users, fetchAction,isPending1 ] = useActionState(getUsers,[])
  const [data5, setData5] = useState(null)
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [dataA, setDataA] = useState(null)
  const [loadingA,setLoadingA] = useState(true);
  const [errorA,setErrorA] = useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        setDataA(res.data);
      }catch(err){
        setErrorA(err);
      }finally{
        setLoadingA(false);
      }
    };
    fetchData();
  },[])

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if(!res.ok){
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setData5(data);
      }catch(err){
        setError(err);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
    },[])

  function handleClick(){
     const minn = 100000;
    const maxx = 999999;
    const newN = Math.floor( Math.random() *(maxx-minn +1) )+minn;
    setOtp(newN);

      const intervalId = setInterval(()=>{
      setCounter5((prevCounter)=> prevCounter -1);
      return ()=> clearInterval(intervalId);
    },1000)
  }

  useEffect(()=>{
    console.log("counter5 ",counter5)
    if(counter5 === 0){
      return;
    }
    

  

   },[])
 


  function handleSubmit(e){
    e.preventDefault()
}
    useEffect(() =>{
      console.log("debouncedquery ",debouncedQuery);
      if(debouncedQuery){
        const results = footballers.filter((footballer) => footballer.toLowerCase().includes(debouncedQuery.toLowerCase()));
        console.log("search results ",results, resultQ, results[0]);
       setResultQ(results);
        console.log("search results ", resultQ);
      }else{
        console.log("Search Results: []");
      }
    },[debouncedQuery] )

    useEffect(()=>{
      if(fQuery.trim() ===''){
        setFResults([]);
        return ;
      }

      const timeoutId = setTimeout(async()=>{
        try{
        const response = await fetch(`https://fruit-search.freecodecamp.rocks/api/fruits?q=${query}`);
         if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("response to fruit query is ",response)
        const data = await response.json();
        console.log("fetch data ",data);
 
        const dataf = data.filter((da)=>da.name.toLowerCase().includes(fQuery.toLowerCase()));
        setFResults(dataf.map(fruit => fruit.name))
        }catch(error){
          console.error("Error fetching data ",error);
        }
      },700)


    },[fQuery])
 
  

  const handleFocus = () =>{
    if(inputRef.current){
      console.log("inputRef.current ",inputRef.current)
      inputRef.current.focus();
    }
  };

  const handleColorChange = (event) =>{
      console.log("color event ",event);
      setColor(event.target.value);
  };

  const addItem = () =>{
    const newItem = {id:items.length+1, name: `Item ${items.length +1}`};
    console.log("newItem is ",newItem);
    items.push(newItem);
   // setItems(items);
   setItems((prevItem)=>[ ...prevItem, newItem] );
  }
  const removeItem = (id) =>{
    console.log("remove id ", id);
    setItems((prevItem) => prevItem.filter((item) => item.id !== id) );
  };

  const handleChange = (e) =>{
    console.log("e is ",e);
    //user.age = e.target.value;
    //console.log("user is ",user)
    // setUser((prevUser) => {
    //   const updatedUser = {...prevUser,age:e.target.value};
    //   console.log("prev state ",prevUser);
    //   console.log("updated state ",updatedUser);
    //   return updatedUser;
    // });
    //updating object in react, crucial step
    const {name,value} = e.target;
    console.log("e.target is ",e.target);
   // updating object in react
    setUser((prevUser) => ({...prevUser,[name]:value} ))
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div><h1>User profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>City: {user.city }</p>
      <h2>Update User Age</h2>
      <input type="number" name="age" value={user.age} onChange={handleChange} />
      <input type="text" name="name" value={user.name} onChange={handleChange} />
      <input type="text" name="city" value={user.city} onChange={handleChange} />
      </div>
      <div>
        <button onClick={addItem}>Add Item</button>
        <ul>
          {items.map((item) =>(
            <li key={item.id}>{item.name} {" "} <button onClick={ ()=> removeItem(item.id) } >Remove</button> </li>
          ))}
        </ul>
      </div>
      
        <div id= "color-change" style={{backgroundColor:color}}>
          <input type='color' value={color} onChange={handleColorChange} />
        </div>
        <div>
          <input ref={inputRef} type="text" placeholder='Enter text' />
          <button onClick={handleFocus} >Focus Input</button>
        </div>
        <div>
          <h1 style={{textAlign:"center"}} >Footballer Search App</h1>
          <div style={{textAlign:"center"}} >
            <input 
            style={{padding:"0.5rem", width:"30%"}}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search for a footballer...'
            />
           
          </div>
          <div style={{textAlign:"center"}} >
            <input 
            style={{padding:"0.5rem", width:"30%"}}
            type='text'
            value={resultQ}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search for a footballer...'
            />
           
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='search-input'>Search for fruits:</label>
            <input 
            id="search-input"
            type='search'
            value={fQuery}
            onChange={(e) => setFQuery(e.target.value)}
            />
          </form>
          <div>
            {fResults.length > 0 ? fResults.map( item => <p key={item} >{item}</p>): <p>No Results found</p> }
          </div>
        </div>
        <div>
          <h1>OTP Generator</h1>
          <h2>{ otp? otp: "Click 'Generate OTP' to get a code"}</h2>
          
          <p aria-live='polite'>
            { counter5 > 0 ? `Expires in: ${counter5} seconds`: "OTP expired. Click the button to generate a new OTP." }
          </p>
          <button onClick={handleClick} disabled={ (counter5 >0 && counter5 <5) ? true:false} >Generate OTP</button>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <form
          action={submit}
          className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
          >
            <h2 className='text-2xl text-center font-semibold text-gray-700 mb-4'>Greet Someone</h2>
            <input
            type="text"
            name='name'
            placeholder='Enter your name'
            required
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
            />
            <button
            type='submit'
            disabled={isPending}
            className='w-full mt-4 p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-all'
            >
              {isPending ? "Greeting...": "Greet"}
            </button>
            {state.message &&(
              <p className='mt-4 text-green-600 text-center font-medium'>{state.message}</p>
            )}
          </form>
        </div>
      <div className='p-6 max-w-lg mx-auto'>
        <button
        //onClick={fetchAction}
        onClick={()=> startTransition(()=> fetchAction())}
        disabled={isPending1}
        className='px-4 py-2 cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 font-bold'
        >
          {isPending1 ? "Fetching Users ...":"Fetch Users"}
        </button>
        <ul className='mt-4 space-y-2'>
          {users.map((user) =>(
            <li key={user.id} className='p-3 bg-gray-100 rounded-lg' >
              <p className='font-semibold'>{user.name}</p>
              <p className='text-sm text-gray-600'>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
      <div> Fetch  <ul>
      {data5.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul></div>
       <div> Fetch using <Axios></Axios> <ul>
      {dataA.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul></div>
    </>
  );

}

export default App
