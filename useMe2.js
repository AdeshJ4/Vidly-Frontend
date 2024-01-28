
const submitMovie = (formData) => {
    console.log("data 1: ", data);
    console.log("data 2: ", formData);
    setData({ ...data, ...formData });
  };

  const handleMovieSubmission = async () => {
    console.log("data while posting: ", data);
    await saveMovie(data);
  };

  const onSubmit = (submittedData) => {
    submitMovie(submittedData);
    handleMovieSubmission();
    navigate("/movies");
  };