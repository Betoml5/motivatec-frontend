const Create = () => {


  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form className="flex flex-col">
        <h1 className="text-2xl ">Crear Post</h1>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Titulo"
        ></input>
        <textarea
          placeholder="Yo pienso que..."
          name="content"
          id="content"
          cols="30"
          rows="20"
          className="input"
        ></textarea>
        <button className="btn">Crear</button>
      </form>
    </div>
  );
};

export default Create;
