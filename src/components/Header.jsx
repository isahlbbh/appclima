import '../styles/header.css'

export default function Header({ city, onCityChange, unit, onUnitChange }) {
    return(
    <header className="header">
      <h1 className="header__logo">Tempo</h1>

      <nav className="header__cities">
        <button
  className={`header__city-button ${city === 'Brasília' ? 'header__city-button--active' : ''}`}
        onClick={() => onCityChange('Brasília')}
        >
          Brasília
        </button>

        <button
  className={`header__city-button ${city === 'São Paulo' ? 'header__city-button--active' : ''}`}
        onClick={() => onCityChange('São Paulo')}
        >
          São Paulo
        </button>

       <button
  className={`header__city-button ${city === 'Recife' ? 'header__city-button--active' : ''}`}
        onClick={() => onCityChange('Recife')}>
          Recife
        </button>
      </nav>

      <div className="header__temperature">
        <button
            className={`header__unit-button ${unit === 'C' ? 'header__unit-button--active' : ''}`}
            onClick={() => onUnitChange('C')}
        >
            °C
        </button>

        <button
            className={`header__unit-button ${unit === 'F' ? 'header__unit-button--active' : ''}`}
            onClick={() => onUnitChange('F')}
        >
            °F
        </button>
        </div>
    </header>
    )
}