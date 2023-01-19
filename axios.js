  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/csv/list`,
        );
        setCSVlist(res.data);
        console.log('Response Data', res.data.data);
        // toast.success(res.data.data);
      } catch (error) {
        console.log(error, 'error');
      }
    };
    fetchData();
  }, []);