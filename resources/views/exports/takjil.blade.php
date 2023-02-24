<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet">
</head>
<title>Document</title>
<style>
  body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  }

  .circle {
    width: 50px;
    height: 50px;
    text-align: center;
    border-style: solid;
    border-width: 2px;
    border-radius: 50%;
  }

  .section-table {
    width: 50%;
  }

  * {
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
  <section>
    <div class="title" style="padding-bottom: 15px">
      <div style="text-align: center;text-transform: uppercase; font-style: bold;">
        JADWAL TAKJIL RAMADHAN 2023M/1444H
      </div>
      <div style="text-align: center;text-transform: uppercase; font-style: bold;">
        MASJID AL - IMAN GODEGAN
      </div>
    </div>

    <div class="row">
      @foreach ($data_split as $key => $item)
        <section class="column">
          <table>
            <thead>
              <tr>
                <th>HARI/TANGGAL</th>
                <th>NAMA</th>
                <th>RT/RW</th>
              </tr>
            </thead>
            <tbody>
              @foreach ($item as $key_two => $item_two)
                <tr>
                  <td style="text-transform: uppercase">
                    {{ \Carbon\Carbon::create($key_two)->isoFormat('dddd, D MMMM Y') }}</td>
                  <td>
                    @foreach ($item_two as $v)
                      <p>{{ $v->warga }}</p>
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
