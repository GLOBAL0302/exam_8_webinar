import {NavLink, useParams} from "react-router-dom";
import {CATEGORIES} from "../../constants.ts";
import {useCallback, useEffect, useState} from "react";
import {ApiQuotes, Quote} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";

const Quotes = () => {

    const {categoryId} = useParams();
    const [quotes,setQuotes ] = useState<Quote[]>([

    ])

    const fetchQuotes = useCallback(async () => {
            let quotesUrl = "/web_quotes.json"

            if (categoryId !== undefined) {
                quotesUrl += `?orderBy="category"&equalTo="${categoryId}"`
            }

            const {data: quotes} = await axiosApi<ApiQuotes | null>(quotesUrl)
            if (quotes === null) {
                setQuotes([])
            } else {
                const newQuotes: Quote[] = Object.keys(quotes).map((id) => ({
                    ...quotes[id],
                    id
                }))
                setQuotes(newQuotes)
            }
        },
        [categoryId])

    useEffect(() => {
        void fetchQuotes()
    }, [fetchQuotes]);

   let pageTitle = "All";
   if(categoryId !== undefined){
       const currentCategory = CATEGORIES.find(category => category.id === categoryId);
       if(currentCategory){
           pageTitle = currentCategory.title
       }else {
           pageTitle = "Not Found"
       }
   }

    return (
        <div className="row mt-2">
            <div className="col-4">
                <ul className="nav flex-column nav-pills">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">All</NavLink>
                    </li>
                    {CATEGORIES.map((category)=>(
                        <NavLink
                            key={category.id}
                            className="nav-link"
                            to={`/web_quotes/${category.id}`}>{category.title}</NavLink>
                    ))}
                </ul>
            </div>
            <div className="col-8">
                <h4>{pageTitle}</h4>
                <div className="">
                    {quotes.map((quote)=>(
                        <div className="card" key={quote.id}>
                            <div className="card-body">
                                <blockquote>{quote.text}</blockquote>
                                <p className="text-secondary">-{quote.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quotes;