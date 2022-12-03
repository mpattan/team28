import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Deck, MapView } from '@deck.gl/core';
import { ScatterplotLayer, LineLayer, GeoJsonLayer } from '@deck.gl/layers';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  title = 'front-end';
  inputForm = new FormGroup({
    keyword: new FormControl("", Validators.required),
    tag: new FormControl("tag")
  })
  tags = ['Art Name', 'Artist Name']
  @ViewChild('input') input: ElementRef;
  displayedColumns: string[] = ["key", "value"];
  dataSource: MatTableDataSource<any> | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  keys: any = ['']
  key_values: any = []
  artist_data=new Map()
  artistName_columns: string[] = ["Title", "Name", "ObjectName","View"]
  artistName_dataSource: MatTableDataSource<any> | undefined;
  showArt:boolean=false;
  showArtist:boolean=false;
  noData:boolean=false;
  noConnection:boolean=false;
  constructor(private appService: AppService, private router: Router,public dialog: MatDialog) {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }
  getData() {
    this.key_values=[]
    var formData = new FormData();
    formData.append("keyword", this.inputForm.get("keyword").value);
    formData.append("tag", this.inputForm.get("tag").value)
    this.appService.getDetails(formData).subscribe((data) => {
      console.log(data);
      if(!data["results"]){
        this.noConnection=true;
      }
      if(data["results"]["bindings"].length ==0){
        this.noData=true
        this.showArt=false
        this.showArtist=false;
        this.noConnection=false;
      }
      else if (data["results"]["bindings"].length == 1) {
        this.noData=false
        this.noConnection=false;
        for (let keys of Object.entries(data["results"]["bindings"][0])) {
          // console.log(keys)
          let sample = {}
          if (keys[1]["value"].includes("#")) {
            sample["key"] = keys[0]
            sample["value"] = keys[1]["value"].split("#")[1]
          }
          else {
            sample["key"] = keys[0]
            sample["value"] = keys[1]["value"]
          }
          console.log(this.dataSource)
          this.key_values.push(sample)
        }
        this.dataSource = new MatTableDataSource(this.key_values);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showArtist=false;
        this.showArt=true;
      }else{
        this.noData=false
        this.noConnection=false
        let artist_datasource=[]
        for(let entry of data["results"]["bindings"]){
          console.log(entry)
          let data_value={}
          let value=""
          let key_data=[]
          let dataSource_sample={}
          let title=""
          for (let keys of Object.entries(entry)) {
            let sample = {}
            if (keys[1]["value"].includes("#")) {
              sample["key"] = keys[0]
              sample["value"] = keys[1]["value"].split("#")[1]
              if(keys[0] == "Title"){
                title=sample["value"]
                value = sample["value"]
              }
            }
            else {
              sample["key"] = keys[0]
              sample["value"] = keys[1]["value"]
            }
            if(sample["key"]=="Title" || sample["key"]=="Name" || sample["key"]=="ObjectName"){
              dataSource_sample[sample["key"]]= sample["value"]
            }
            key_data.push(sample)
            data_value[value]= key_data
            // this.dataSource = new MatTableDataSource(this.key_values);
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
            // console.log(this.dataSource)
          }
          artist_datasource.push(dataSource_sample)
          this.artist_data.set(title,data_value)
          // this.artist_data[title] = data_value
          // this.artist_data.push(data_value)
        }  
        this.artistName_dataSource = new MatTableDataSource(artist_datasource);
        this.artistName_dataSource.paginator = this.paginator;
        this.artistName_dataSource.sort = this.sort;   
        this.showArt=false;
        this.showArtist=true;
      }

    })
  }
  ngOnInit() {
  }
  viewDetails(title){
    let data=this.artist_data.get(title)
    const dialogRef = this.dialog.open(MapComponent, {
      width: '70%',
      height: '80%',
      data: data[title],
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
