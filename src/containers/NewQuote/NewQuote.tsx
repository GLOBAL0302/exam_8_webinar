import React, {useState} from 'react';
import {CATEGORIES} from "../../constants.ts";
import {ApiQuote} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import {useNavigate} from "react-router-dom";

const NewQuote = () => {
    const navigate = useNavigate()
    const [quoteMutation, setQuoteMutation] = useState<ApiQuote>({
        category:"",
        author:"",
        text: ""
    })

    const onFieldChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement |HTMLTextAreaElement>)=>{
        const {name, value} = event.target;
        setQuoteMutation((prevState)=>({
            ...prevState,
            [name]:value
        }));
    }

    const onSubmit = async (event:React.FormEvent)=>{
        event.preventDefault();
        await axiosApi.post("/web_quotes.json", quoteMutation);
        navigate("/");
    }

    return (
        <div className="row mt-2">
            <div className="col">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            value={quoteMutation.category}
                            onChange={onFieldChange}
                            className="form-select"
                            name="category"
                            id="category">
                            {CATEGORIES.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            onChange={onFieldChange}
                            value={quoteMutation.author}
                            required
                            type="text"
                            name="author"
                            id="author"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Description</label>
                        <textarea
                            value={quoteMutation.text}
                            onChange={onFieldChange}
                            name="text"
                            id="text"
                            className="form-control"
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewQuote;