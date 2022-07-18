import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { providers, Contract, utils} from 'ethers';
const snarkjs = require('snarkjs');


export default function IndexPage() {

  const [state, setState] = React.useState({
    a:"",
    b:"",
    proof: "",
    publicSignals: "",
  })

  let handleCalcProof = () => {
    calculateProof(state, setState);
  }

  let handleVerifyProof = () => {
    verifyProof(state, setState);
  }

  let handleVerifyProofonChain = () => {
    verifyProofOnChain(state, setState);
  }



  return (
    <div className="container">

    <div className="row">
      <div className="col-2"></div>
      <div className="col text-center">
        <h1>Test Proof Generation and Verification</h1>
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-2"></div>
      <div className="col-8">

        <div className="mt-3">
          <div className="card">
            <div className="card-header">
              Calculate proof and generate Proof
            </div>

            <div className="card-body">

              <div className="input-group mt-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    A
                  </div>
                </div>
                <input
                  type="text"
                  name="a"
                  className="form-control"
                  value={state.a}
                  onChange={evt => setState({...state, [evt.target.name]: evt.target.value})}
                  />
              </div>

              <div className="input-group mt-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                  B 
                  </div>
                </div>
                <input
                  type="text"
                  name="b"
                  className="form-control"
                  value={state.b}
                  onChange={evt => setState({...state, [evt.target.name]: evt.target.value})}
                  />
              </div>

            </div>
            <div className="card-footer"> 
              <button className="btn btn-primary" onClick={handleCalcProof}>Calculate Proof</button>
              <button className="btn btn-primary" onClick={handleVerifyProof}>Verify Proof</button>
            </div>
          </div>
        </div>

        
         

        </div>
        <div className="col-4"></div>
      </div>
    </div>
  )
}


async function calculateProof(state, setState) {

  // Load files and run proof locally
  let DOMAIN = "http://localhost:3000";
  let wasmBuff = await getFileBuffer(`${DOMAIN}/multiplier.wasm`);
  let zkeyBuff = await getFileBuffer(`${DOMAIN}/multiplier.zkey`);

  let input = {
    a: state.a,
    b: state.b,
  }

  console.log(input)

  try {

    let {proof, publicSignals} = await snarkjs.plonk.fullProve(input, wasmBuff, zkeyBuff);
    console.log(proof)
    console.log(publicSignals)

    setState({...state, proof:proof, publicSignals:publicSignals})

  } catch (error) {
    alert("Proof generation Failed: " + error)
  } 
}

async function verifyProof(state , setState ) {

  let vkey = await fetch (`http://localhost:3000/verification_key.json`).then(res => res.json());

  const verified = await snarkjs.plonk.verify(vkey, state.publicSignals, state.proof);

  console.log(verified)

}



async function getFileBuffer(filename) {
  let req = await fetch(filename);
  return Buffer.from(await req.arrayBuffer());
}