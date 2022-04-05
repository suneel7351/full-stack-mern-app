class ApiFeatures {
  constructor(query, querySrt) {
    this.query = query;
    this.querySrt = querySrt;
  }
  search() {
    const keyword = this.querySrt.keyword
      ? {
          name: {
            $regex: this.querySrt.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
}

module.exports = ApiFeatures;
