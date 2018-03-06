import axios from "axios";
import {
  decodeToken,
  getIdToken
} from './AuthService';

export default {
  // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
  
  //user login
  login: (credentials) => {
    return axios.post("/api/auth/login", credentials)
  },
  
  // if there is a token, get current user
  getUser: data => getIdToken() ? axios.get(`/api/users/${decodeToken(getIdToken()).sub}`) : Promise.reject({err: "There is no user son"}),
  
  // add a goal to the current gig
  createGig: data => axios.post(`/api/users/${decodeToken(getIdToken()).sub}/gigs`, data),

  // add a goal to the current gig
  addGoalToGig: data => axios.post('/api/goals', data),

  createUserIfDoesNotExist: () => {
    const user = decodeToken(getIdToken());
    return axios.post("/api/users", user)
  },

  // createItem: plaidObj => {
  //   const data = {};
  //   data.user = decodeToken(getIdToken());
  //   data.plaidObj = plaidObj;
  //   return axios.post('/api/users/items', data);
  // },
  getAccessToken: plaidObj => {
    const data = {};
    data.user = decodeToken(getIdToken());
    data.plaidObj = plaidObj;
    return axios.post('/api/users/items', data);

  },

  accountsSync: () => {
    console.log("Accounts syncing");
    console.log(decodeToken(getIdToken()))
    const user = decodeToken(getIdToken());
    axios.post('/api/users/transactions', user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));



    // const user = {};
    // user.user_jwt ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJlbkB0aGlzaXNiYW0uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY2hlZGFoLmF1dGgwLmNvbS8iLCJzdWIiOiJmYWNlYm9va3wxMDE1NTQ1NjI1MzAxMjcxMiIsImF1ZCI6Ims0UWZvNXBaVVQ4YnhCYTBWNHZSbVJvYUQyNlkxMjRHIiwiaWF0IjoxNTE5MTc0MjA2LCJleHAiOjE1MTkyMTAyMDYsImF0X2hhc2giOiJCMUNmZjBtNHlrbDgzeEp1elpGSEdBIiwibm9uY2UiOiI0Ymx2LXlGR1hnSzJ5cWltVjBGMURvLXlBSmhxd25wZiJ9.ZuxGKI_YeNGGuvtporvkLT9Jd7f2kSekkrROSb4w2kM';
    // return axios.post("/api/transactions/", user)
  },

  gigData: (gigDetails) => {
    const user = decodeToken(getIdToken());
    //attach decoded user info
    gigDetails.user = user;

    axios.post('/api/gigs/' + gigDetails.gigId, gigDetails)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },


  //transactions
  getTransactionsByAccount: account => {
    return new Promise((resolve, reject) => {
      const data = [{
          id: 1,
          date: "11/23/14",
          vendor: "Google",
          category: "Advertising",
          gig: "Uber",
          ammount: 200.00
        },
        {
          id: 2,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          ammount: 15.00
        },
        {
          id: 3,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          ammount: 12.00
        },
        {
          id: 4,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          ammount: 16.00
        },
        {
          id: 5,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          ammount: 119.00
        },
        {
          id: 6,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          ammount: 219.00
        },
        {
          id: 7,
          date: "11/23/14",
          vendor: "Staples",
          category: "Promotion",
          gig: "Uber",
          ammount: 29.00
        }
      ];
      resolve(data);
    });
  },

///////////////// GIG DETAIL VIEW

loadGig: gigId => {
  console.log(gigId);
  const user = decodeToken(getIdToken());
  console.log(user);
  return Promise.resolve({
      gigName: "Uber",
      gigId: '5a91b813513541155c819fa4',
      gigSummary: {
        moneyIn: 7200.25,
        expenses: 1875.11,
        net: 4575.22
      },
      expenseSummary: [
        {
          vendorName: "Shell",
		  category: "Gas",
          sum: 300.25
        },
        {
          vendorName: "Jiffy Lube",
		  category: "Repair",
          sum: 200.25
        },
        {
          vendorName: "Black Dog Car Wash",
		  category: "Maintainance",
          sum: 100.55
        }
      ],
      transactions: [
        {
          id: 1,
          date: "11/23/14",
          vendor: "Google",
          category: "Advertising",
          gig: "Uber",
          amount: 200.00
        },
        {
          id: 2,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          amount: 15.00
        },
        {
          id: 3,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          amount: 12.00
        },
        {
          id: 4,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          amount: 16.00
        },
        {
          id: 5,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          amount: 119.00
        },
        {
          id: 6,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          amount: 219.00
        },
        {
          id: 7,
          date: "11/23/14",
          vendor: "Staples",
          category: "Promotion",
          gig: "Uber",
          amount: 29.00
        }
      ],
      goals:  [
        { id: 1, name:"Spend Less On Tolls", budget: 200.00, spent: 100.00, net: 100.00, categories: ['tolls'] }, // id is goal id
        { id: 2, name:"Spend Less on Gas", budget: 425.00, spent: 300.00, net: 125.00, categories: ['gas', 'travel']}
    ],
    categories: [{
      id: '23748927489237',
      name: 'Travel'
    },
    {
      id: '23748927439237',
      name: 'Tolls'
    },{
      id: '23748927289237',
      name: 'Gas'
    }
  ]
  })
  // return axios.post('/api/gigs/:id', user);
},


editGoal: plaidObj => {
  // const data = {};
  // data.user = decodeToken(getIdToken());
  // data.plaidObj = plaidObj;
  // return axios.post('/api/users/items', data);
},

editTransaction: plaidObj => {
  // const data = {};
  // data.user = decodeToken(getIdToken());
  // data.plaidObj = plaidObj;
  // return axios.post('/api/users/items', data);
},

///////////////// END GIG DETAIL VIEW




};
