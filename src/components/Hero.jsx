import React, { useEffect, useRef, useState } from "react";

console.log("Hero render outside");

const Hero = () => {
  const [count, setCount] = useState(1); // return []
  const [show, setShow] = useState(false);

  const heading = useRef(null);

  console.log("Hero render inside");

  const handleClick = () => {
    setCount(count + 1);
    console.log(heading.current.textContent);
    heading.current.style.color = "red";
  };

  return (
    <div>
      <h2 ref={heading}>Heading</h2>
      <div className="border rounded mx-auto w-20 flex items-center justify-between">
        <button
          className="p-1 text-xl flex-1 disabled:opacity-50"
          disabled={count <= 1}
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span>{count}</span>
        <button className="p-1 text-xl flex-1" onClick={handleClick}>
          +
        </button>
      </div>

      <button onClick={() => setCount(0)}>reset</button>
      <br />
      <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>

      {show && (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aperiam
          quasi praesentium sed facere officiis voluptatem minus, ipsam totam!
          Officiis molestias omnis excepturi veniam nam ipsum assumenda soluta
          natus dignissimos ex. Ut nemo nihil nam quaerat? Neque impedit id
          molestiae nemo vel eligendi quisquam facere eum voluptatem veniam
          cupiditate quos tenetur, odit consequatur a cumque! Ex delectus quia,
          error molestiae harum veniam porro in aperiam est id dignissimos nam
          dolore eveniet maiores sint eum ipsa dolores recusandae maxime
          eligendi fuga beatae quis nostrum. Adipisci suscipit quasi labore
          aliquam praesentium earum, ducimus rerum inventore ullam culpa
          nesciunt veritatis soluta modi vel velit quaerat ea? Deleniti beatae
          aperiam libero neque repellat dicta quibusdam inventore veniam sequi
          cumque? Dignissimos iure voluptatem ex beatae corrupti? Culpa aliquid
          quam officia alias in dolorum possimus delectus corrupti odit
          quibusdam quis a odio asperiores neque ab maiores quidem, voluptate
          voluptatibus. Nesciunt voluptate accusamus quae! Nesciunt ullam
          accusantium obcaecati aspernatur. Asperiores a doloremque harum
          blanditiis aspernatur modi beatae eaque rerum nemo quos perferendis
          laborum quaerat porro placeat commodi sapiente nihil, autem soluta
          saepe, illum aliquam unde ipsum? Porro nesciunt dolorem labore
          consequatur veritatis eligendi illo voluptatum excepturi. A voluptates
          ipsa, id ad praesentium iste quia vel debitis eligendi!
        </p>
      )}

      <div
        className={`fixed top-0 ${
          show ? "right-0" : "right-[-320px]"
        } w-80 h-screen duration-500 bg-slate-400`}
      >
        <button onClick={() => setShow(false)}>X</button>
      </div>
    </div>
  );
};

export default Hero;
