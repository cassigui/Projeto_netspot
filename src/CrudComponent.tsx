function Crud() {
  return (
    <>
      <div className='container'>

        <h1>NOVA LEITURA DE REDE</h1>

        <form action="submit">

          <div className='firstLine'>
            <label htmlFor="local">Local:</label>
            <input type="text" id="local" name="local" placeholder='Local: ' />

            <label htmlFor="nivelSinal">Nível de Sinal:</label>
            <input type="text" id="nivelSinal" name="nivelSinal" placeholder='Nível do Sinal: ' />

            <div>
              <div className="radioContainer">
                <label htmlFor="nghz1" className='textRadio'>2.4ghz</label>
                <input type="radio" className='Lradios' name="nghz2" />
              </div>
              <div className="radioContainer">
                <label htmlFor="nghz2" className='textRadio'>5.0ghz</label>
                <input type="radio" className='Lradios' name="nghz2" />
              </div>
            </div>

          </div>

          <div className='secondLine'>
            <label htmlFor="interferencia">Interferência:</label>
            <input type="text" id="interferencia" name="interferencia" placeholder='Interferência:' />

            <label htmlFor="velocidadeSinal">Velocidade do Sinal:</label>
            <input type="text" id="velocidadeSinal" name="velocidadeSinal" placeholder='Velocidade do Sinal: ' />

            <div className="">
              <div className="radioContainer">
                <label htmlFor="vghz1" className='textRadio'>2.4ghz</label>
                <input type="radio" className='Lradios' name="vghz2" />
              </div>
              <div className="radioContainer">
                <label htmlFor="vghz2" className='textRadio'>5.0ghz</label>
                <input type="radio" className='Lradios' name="vghz2" />
              </div>
            </div>

          </div>

          <input type="button" name='enviar' id='enviar' value={"ENVIAR"} />

        </form>
      </div>
    </>
  )
}

export default Crud;