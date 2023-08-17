const Articles = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-2xl mt-4 md:m-0">Sobre motivacion estudiantil:</h3>
      <div className="bg-red-300 p-4 rounded-md shadow-md">
        <a
          className="underline"
          href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjox-z2g_T_AhVYIUQIHQJuDzcQFnoECBIQAQ&url=https%3A%2F%2Fwww.flup.es%2Fimportancia-motivacion-estudiantes%2F&usg=AOvVaw2ew890521DHakkjJk1s8Iw&opi=89978449"
        >
          La importancia de la motivacion en los estudiantes{" "}
        </a>
      </div>
      <div className="bg-purple-300 p-4 rounded-md shadow-md">
        <a
          className="underline"
          href="https://uchile.cl/presentacion/centro-de-aprendizaje-campus-sur/Material-Autorregulacion-Emocional/reconocer-prevenir-y-afrontar-el-estres-academico"
        >
          Reconocer, prevenir y afrontar el estrés académico
        </a>
      </div>
      <div className="bg-yellow-300  p-4 rounded-md shadow-md">
        <a
          className="underline"
          href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjz6IDhhvT_AhV5C0QIHdWVCYkQFnoECBEQAQ&url=https%3A%2F%2Fwww.enriccorberainstitute.com%2Fblog%2Fmotivacion-en-los-estudiantes%2F&usg=AOvVaw2HB8bhbwPGnVrIBwcGSpFK&opi=89978449"
        >
          La motivación en los estudiantes: 3 Claves para aumentarla
        </a>
      </div>
    </div>
  );
};

export default Articles;
