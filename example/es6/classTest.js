class Parent {
  // constructor(name) {
  //   this.name = name
  // }
  staticProp = "static"
  getName() {
    console.log("foo")
  }
}

class Student extends Parent {
  constructor(name, major) {
    super(name)
    this.major = major
  }
  hasStaticProps() {
    console.log(this.staticProp)
  }
  getMajor() {
    console.log(this.major)
  }
}

const s = new Student("a", "majora")
s.hasStaticProps()

// class的scope有什么特殊之处么？
