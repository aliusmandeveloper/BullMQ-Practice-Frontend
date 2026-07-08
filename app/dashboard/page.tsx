export default function DashboardPage() {


  return (

    <div>


      <h1 className="
text-3xl
font-bold
mb-6
">
        Welcome To Dashboard 🚀
      </h1>



      <div className="
grid
grid-cols-4
gap-5
">


        <div className="
bg-white
p-5
rounded-xl
shadow
">

          <h2>
            Total Tasks
          </h2>

          <p className="
text-3xl
font-bold
">
            25
          </p>

        </div>



        <div className="
bg-white
p-5
rounded-xl
shadow
">

          <h2>
            Completed
          </h2>

          <p className="
text-3xl
font-bold
">
            10
          </p>

        </div>



        <div className="
bg-white
p-5
rounded-xl
shadow
">

          <h2>
            Pending
          </h2>

          <p className="
text-3xl
font-bold
">
            15
          </p>

        </div>



        <div className="
bg-white
p-5
rounded-xl
shadow
">

          <h2>
            Users
          </h2>

          <p className="
text-3xl
font-bold
">
            5
          </p>

        </div>


      </div>



    </div>

  );


}