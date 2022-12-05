<Card className="">
  <section className="w-3/4 mx-auto flex flex-col gap-10">
    <div className="title">
      <h1 className="text-4xl font-bold py-4 afterline">Welcome to DSS</h1>
    </div>

    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <TextField placeholder="Email" type="email" /><br></br>
      <TextField placeholder="Password" type="password" /><br></br>
      <Button>Login</Button>
    </form>
    <span className="text-xs">The data held on this system is private property. Access to the data is only available for authorised users and authorised purposes. Unauthorised etry contravenes the Computer Misuse Act 1990 and may incur criminal penalties as well as adamages.</span>
    <span className="text-xs text-center">(C) Empowering Energy Solutions Ltd 2022</span>
  </section>
</Card>