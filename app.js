class App extends React.Component {
   state = {
      incomes: [],
      expenses: [],
      totalIncome: 0,
      totalExpense: 0,
      totalBudget: 0,
      isOpen: false,
      modalType: ''
   }

   handleOpenModalClick = (type) => {
      this.setState({
         isOpen: true,
         modalType: type
      })
   }

   handleCloseModalClick = () => {
      this.setState({
         isOpen: false
      })
   }

   render() { 
      return (  
         <div className='app'>
            <Header 
               openModalClick={this.handleOpenModalClick}
            />
            <Body 
               totalIncome={this.state.totalIncome}
               totalExpense={this.state.totalExpense}
               totalBudget={this.state.totalBudget}
            />
            {this.state.isOpen && <Modal
               isOpen={this.state.isOpen}
               modalType={this.state.modalType}
               closeModalClick={this.handleCloseModalClick}
            />}
         </div>
      );
   }
}

const Header = ({openModalClick}) => (
   <header className='app__header'>
      <IconAdd 
         src='img/income.svg'
         text='Add Income'
         openModalClick={openModalClick}
      />
      <Title />
      <IconAdd 
         src='img/expense.svg'
         text='Add Expense'
         openModalClick={openModalClick}
      />
   </header>
)

const IconAdd = ({src, text, openModalClick}) => (
   <div className='header__button' onClick={ () => openModalClick(text)}>
      <img src={src} alt={text}/>
      {text}
   </div>
)

const Title = () => (
   <h1 className='app__title'>Budget Manager App</h1>
)

const Body = ({totalIncome, totalExpense, totalBudget}) => (
   <div className='app__body'>
      <Bar 
         nameClass='income'
         type='Total Income:'
         totalBudget={totalIncome}
      />
      <TotalBudget 
         totalBudget={totalBudget}
      />
      <Bar 
         nameClass='expense'
         type='Total Expense:'
         totalBudget={totalExpense}
      />
   </div>
)

const Bar = ({nameClass, type, totalBudget}) => (
   <div className={`body__bar ${nameClass}`}>
      <p>{type}</p>
      <span>{totalBudget} PLN</span>
   </div>
)
 
const TotalBudget = ({totalBudget}) => (
   <div className='body__total-budget'>
      <p>My Budget</p>
      <div>
         {totalBudget}
         <span>PLN</span>
      </div>
   </div>
)

class Modal extends React.Component {
   state = {
      elementName: '',
      elementValue: ''
   }

   handleInputChange = (event, type) => {
      if(type === 'name') {
         this.setState({
            elementName: event.currentTarget.value
         })
      } else if(type === 'value') {
         this.setState({
            elementValue: event.currentTarget.value
         })
      }
   }

   render() { 
      const {isOpen, modalType, closeModalClick} = this.props
      const style = modalType === 'Add Income' ? {color: '#00E676'} : {color: '#E6004C'};

      return (  
         <div className='container__modal'> 
            <dialog className='modal' open={isOpen}>
               <CloseModal 
                  closeModalClick={closeModalClick}
               />
               <p style={style} className='modal__title'>{modalType}</p> 
               <ModalForm 
                  elementName={this.state.elementName}
                  elementValue={this.state.elementValue}
                  inputChange={this.handleInputChange}
               />
            </dialog>
         </div>
      );
   }
}

const CloseModal = ({closeModalClick}) => (
   <div className='modal__close' onClick={ () => closeModalClick()}>
      &times;
   </div>
)

const ModalForm = ({elementName, elementValue, inputChange}) => (
   <form className='modal__form'>    
      <ModalInputName 
         elementName={elementName}
         inputChange={inputChange}
      />
      <ModalInputValue 
         elementValue={elementValue}
         inputChange={inputChange}
      />
   </form>
)
 
const ModalInputName = ({elementName, inputChange}) => (
   <div>
      <div className='form__description'>
         Description
      </div>   
      <input className='form__input' type='text' value={elementName} onChange={(event) => inputChange(event, 'name')}/>
   </div>
)

const ModalInputValue = ({elementValue, inputChange}) => (
   <div>
      <div className='form__description'>
         Value
      </div>   
      <input className='form__input' type='number' value={elementValue} onChange={ (event) => inputChange(event, 'value')}/>
   </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));