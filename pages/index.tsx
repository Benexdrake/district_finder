import { Street } from '@/street';
import STREETS from '@/streets.json'
import { useState } from 'react';

export default function Home() {
  let s = STREETS as Street[]
  const [streets, setStreets] = useState<Street[]>(s)

  let streetHandler = async (e: { target: { value: string; }; }) => {
    let s = await getStreetsByName(e.target.value);
    setStreets(s);
}

  return (
    <div className="container" style={{paddingTop: '2rem'}}>
      <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Straßen Name" aria-label="Search" onChange={streetHandler} style={{marginBottom:'1rem'}}/>
                </div>
                <div className="css-table d-flex justify-content-center" style={{ display: 'flex', gap: '0.5rem', flexWrap:'wrap' }}>
                <table className="table table-striped">
                            <thead>
                              <tr>
                                <th scope='col'>Bezirk</th>
                                <th scope='col'>Straße</th>
                                <th scope='col'>Ort</th>
                                <th scope='col'>PLZ</th>
                              </tr>
                            </thead>
                            <tbody>

                    {streets.map(x => {
                      return (
                        <tr>
                          <td>{x.district}</td>
                          <td>{x.street}</td>
                          <td>{x.location}</td>
                          <td>{x.postcode}</td>
                        </tr>
                        )
                      })}
                      </tbody>
                          </table>
                </div>
    </div>
  )
}

async function getStreetsByName(name:string)
{
  let streets = STREETS as Street[];
  return streets.filter(x => x.street.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
         .sort((s1,s2) => (s1.district > s2.district) ? 1 : (s1 < s2) ? -1 : 0);
}
