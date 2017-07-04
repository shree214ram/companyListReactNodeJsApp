var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value,1);
    },
    searchHandlerViaBusinessId: function() {
        this.props.searchHandler(this.refs.searchBusinessId.getDOMNode().value,2);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="text" ref="searchKey"  />
                
                <input type="button" onClick={this.searchHandler}  value="Get Company By Name"/>
                
                
                <input className="specialInput" type="text" ref="searchBusinessId"  />
                
                <input type="button" onClick={this.searchHandlerViaBusinessId}  value="Get Company By BusinessId"/>
            </div>

        );
    }
});


var SearchViaName = React.createClass({
    searchViaNameHandler: function() {
        this.props.searchViaNameHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            <div className="">
                <input type="text" value={this.props.searchKey}/>
            </div>

        );
    }
});




var CompanyListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#companies/" + this.props.company.businessId}>
                    
                    <p>Company Name : {this.props.company.name} </p>
                    <p>Business Id : {this.props.company.businessId} </p>
                    <p>Registration Date : {this.props.company.registrationDate}</p>
                    <p>Company Form : {this.props.company.companyForm}</p>
                                       
                </a>
                
            </li>
        );
    }
});

var CompanyList = React.createClass({
    render: function () {
        var items = this.props.companies.map(function (company) {
            return (
                <CompanyListItem key={company.id} company={company} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Company List Node React App " back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler} searchHandlerViaBusinessId={this.props.searchHandlerViaBusinessId}/>
                
               
                
                <div className="content">
                    <CompanyList companies={this.props.companies}/>
                </div>
            </div>
        );
    }
});

var CompanyPage = React.createClass({
    getInitialState: function() {
        return {company: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.companyId).done(function(result) {
            this.setState({company: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Company Details" back="true"/>
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            
                            <h1>{this.state.company.name} </h1>
                            <p>{this.state.company.registrationDate}</p>
                        </li>                               
                                                    
                                                                       
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.company.officePhone} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                Business Id
                                    <p>{this.state.company.businessId}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.company.mobilePhone} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                Registration Date
                                    <p>{this.state.company.registrationDate}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"sms:" + this.state.company.mobilePhone} className="push-right">
                                <span className="media-object pull-left icon icon-sms"></span>
                                <div className="media-body">
                                Company Form
                                    <p>{this.state.company.companyForm}</p>
                                </div>
                            </a>
                        </li>
                        
                                               
                        <li className="table-view-cell media">
                            <a href={"mailto:" + this.state.company.email} className="push-right">
                                <span className="media-object pull-left icon icon-email"></span>
                                <div className="media-body">
                                Language
                                   <div>{this.state.company.language}</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});
/* <p>Street:{this.state.company.addresses[0].street},
                                    PostCode:{this.state.company.addresses[0].postCode},
                                    City:{this.state.company.addresses[0].city},
                                    Country:{this.state.company.addresses[0].country}</p>*/
var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: '',
            searchBusinessId: '',
            companies: []
        }
    },
    searchHandler: function(searchKey,as) {
		if(as==1){
			companyService.findByName(searchKey).done(function(companies) {
				this.setState({
					searchKey:searchKey,
					companies: companies,
					pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} companies={companies}/>]});
			}.bind(this));
		}
		if(as==2){
			companyService.findByBusinessId(searchKey).done(function(companies) {
				this.setState({
					searchBusinessId:searchKey,
					companies: companies,
					pages: [<HomePage key="list" searchHandlerViaBusinessId={this.searchHandlerViaBusinessId} searchBusinessId={searchKey} companies={companies}/>]});
			}.bind(this));
		}
    },
    
    searchHandlerViaBusinessId: function(searchBusinessId) {
        companyService.findById(searchBusinessId).done(function(companies) {
            this.setState({
                searchBusinessId:searchBusinessId,
                companies: companies,
                pages: [<HomePage key="list" searchHandlerViaBusinessId={this.searchHandlerViaBusinessId} searchBusinessId={searchBusinessId} companies={companies}/>]});
        }.bind(this));
    },
    
    
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} companies={this.state.companies}/>);
        }.bind(this));
        
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandlerViaBusinessId={this.searchHandlerViaBusinessId} searchBusinessId={this.state.searchBusinessId} companies={this.state.companies}/>);
        }.bind(this));
        
        router.addRoute('companies/:id', function(id) {
            this.slidePage(<CompanyPage key="details" companyId={id} service={companyService}/>);
        }.bind(this));
        router.start();
    }
});

React.render(<App/>, document.body);
