<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {{-- <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"> --}}
  {{-- <link href="https://fonts.cdnfonts.com/css/verdana" rel="stylesheet"> --}}
  {{-- <link href="https://fonts.cdnfonts.com/css/arial" rel="stylesheet"> --}}

</head>
<title>Document</title>
<style>
  @import url('https://fonts.cdnfonts.com/css/arial');

  body {
    font-family: 'Arial', sans-serif;
    margin-left: 17px;
  }

  * {
    font-size: 12px;
  }

  table,
  th,
  td {
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid black;
    border-collapse: collapse;
  }

  tr>td>p {
    line-height: 0.6;
    font-family: 'Arial', sans-serif;
  }

  / * {
    box-sizing: border-box;
  }

  .column {
    float: left;
    width: 50%;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  .page-break {
    page-break-after: always;
  }
</style>
</head>

<body>
  <section style="padding-top: 25px;">
    <div class="title" style="font-size: 14px;">
      <div style="text-align: center;text-transform: uppercase; font-style: bold; font-size: 14px;">
        JADWAL PIKET RAMADHAN 2023M/1444H
      </div>
      <div style="text-align: center;text-transform: uppercase; font-style: bold; font-size: 14px;">
        MASJID AL - IMAN GODEGAN
      </div>
    </div>

    <div class="row">
      @foreach ($data_split as $key => $item)
        <section class="column" style="padding-top: 40px;">
          <table>
            <thead>
              <tr>
                <th>HARI/TANGGAL</th>
                <th colspan="2">NAMA</th>
                <th>RT/RW</th>
              </tr>
            </thead>
            <tbody>
              @foreach ($item as $key_two => $item_two)
                <tr>
                  <td style="text-transform: uppercase">
                    <p>{{ \Carbon\Carbon::create($key_two)->isoFormat('dddd,') }}</p>
                    <p>{{ \Carbon\Carbon::create($key_two)->isoFormat('D MMMM Y') }}</p>
                  </td>
                  <td colspan="2" style="padding-right: 60px;">
                    @foreach ($item_two as $v)
                      <p class="warga" style="text-transform: capitalize !important;">
                        {{ $v->petugas }}</p>
                    @endforeach
                  </td>
                  <td style="text-align: center">
                    @foreach ($item_two as $v)
                      <p>{{ $v->RT }}/{{ $v->RW }}</p>
                    @endforeach
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
        </section>
        @if ($key % 2 != 0)
          <div class="page-break"></div>
        @endif
      @endforeach
    </div>
  </section>
</body>

</html>
